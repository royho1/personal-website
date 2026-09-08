/**
 * Persistent log of visitor questions to Atlas.
 * Uses Upstash Redis REST when configured; no-ops otherwise so local
 * and preview deploys still work without Redis.
 */

export type AtlasQuestionEntry = {
  id: string;
  question: string;
  at: string;
};

const LIST_KEY = "atlas:questions";
const MAX_ENTRIES = 200;

function redisCredentials(): { url: string; token: string } | null {
  // Vercel Marketplace Upstash uses KV_REST_API_*; direct Upstash
  // dashboards often use UPSTASH_REDIS_REST_*.
  const url =
    process.env.KV_REST_API_URL?.trim() ||
    process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token =
    process.env.KV_REST_API_TOKEN?.trim() ||
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  return { url, token };
}

function redisConfigured(): boolean {
  return redisCredentials() !== null;
}

async function redisPipeline(
  commands: unknown[][],
): Promise<{ result?: unknown }[]> {
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

  return (await response.json()) as { result?: unknown }[];
}

export async function appendAtlasQuestion(
  question: string,
): Promise<void> {
  if (!redisConfigured()) return;

  const trimmed = question.trim();
  if (!trimmed) return;

  const entry: AtlasQuestionEntry = {
    id: `q-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    question: trimmed.slice(0, 4000),
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
