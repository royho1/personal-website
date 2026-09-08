/**
 * Persistent log of Atlas visitor exchanges (question + reply).
 * Uses Upstash Redis REST when configured; no-ops otherwise so local
 * and preview deploys still work without Redis.
 */

export type AtlasQuestionEntry = {
  id: string;
  question: string;
  /** Atlas reply when available. Older entries may omit this. */
  reply?: string;
  at: string;
};

const LIST_KEY = "atlas:questions";
const MAX_ENTRIES = 200;
const MAX_REPLY_CHARS = 8000;

function redisCredentials(): { url: string; token: string } | null {
  // Prefer complete credential pairs so a leftover KV_* value cannot mix with
  // an Upstash token (or the reverse) and look "configured" while auth fails.
  const kvUrl = process.env.KV_REST_API_URL?.trim();
  const kvToken = process.env.KV_REST_API_TOKEN?.trim();
  if (kvUrl && kvToken) {
    return { url: kvUrl, token: kvToken };
  }

  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (upstashUrl && upstashToken) {
    return { url: upstashUrl, token: upstashToken };
  }

  return null;
}

function redisConfigured(): boolean {
  return redisCredentials() !== null;
}

async function redisPipeline(
  commands: unknown[][],
): Promise<{ result?: unknown; error?: string }[]> {
  const credentials = redisCredentials();
  if (!credentials) {
    throw new Error("Upstash Redis is not configured.");
  }
  const { url, token } = credentials;

  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Upstash error ${response.status}: ${body}`);
  }

  const payload = (await response.json()) as {
    result?: unknown;
    error?: string;
  }[];

  // Upstash can return HTTP 200 with per-command error objects. Treat those
  // as failures so callers log/502 instead of silently dropping writes.
  for (const [index, entry] of payload.entries()) {
    if (entry && typeof entry.error === "string" && entry.error.length > 0) {
      throw new Error(`Upstash command ${index} failed: ${entry.error}`);
    }
  }

  return payload;
}

export async function appendAtlasExchange(input: {
  question: string;
  reply: string;
}): Promise<void> {
  if (!redisConfigured()) return;

  const question = input.question.trim();
  const reply = input.reply.trim();
  if (!question || !reply) return;

  const entry: AtlasQuestionEntry = {
    id: `q-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    question: question.slice(0, 4000),
    reply: reply.slice(0, MAX_REPLY_CHARS),
    at: new Date().toISOString(),
  };

  // LPUSH newest-first, then trim so the list cannot grow forever.
  await redisPipeline([
    ["LPUSH", LIST_KEY, JSON.stringify(entry)],
    ["LTRIM", LIST_KEY, 0, MAX_ENTRIES - 1],
  ]);
}

export async function listAtlasQuestions(
  limit = 100,
): Promise<AtlasQuestionEntry[]> {
  if (!redisConfigured()) return [];

  const capped = Math.min(Math.max(limit, 1), MAX_ENTRIES);
  const results = await redisPipeline([
    ["LRANGE", LIST_KEY, 0, capped - 1],
  ]);
  const raw = results[0]?.result;
  if (!Array.isArray(raw)) return [];

  const entries: AtlasQuestionEntry[] = [];
  for (const item of raw) {
    if (typeof item !== "string") continue;
    try {
      const parsed = JSON.parse(item) as Partial<AtlasQuestionEntry>;
      if (
        typeof parsed.id === "string" &&
        typeof parsed.question === "string" &&
        typeof parsed.at === "string"
      ) {
        entries.push({
          id: parsed.id,
          question: parsed.question,
          at: parsed.at,
          ...(typeof parsed.reply === "string" && parsed.reply.length > 0
            ? { reply: parsed.reply }
            : {}),
        });
      }
    } catch {
      // Skip corrupt rows rather than failing the whole inbox.
    }
  }
  return entries;
}

export function isAtlasLogConfigured(): boolean {
  return redisConfigured();
}
