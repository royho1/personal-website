import { NextResponse } from "next/server";
import {
  isAtlasLogConfigured,
  listAtlasQuestions,
} from "@/app/lib/atlasLog";

function readSecret(request: Request): string | null {
  const header = request.headers.get("x-atlas-log-secret")?.trim();
  if (header) return header;

  const auth = request.headers.get("authorization");
  if (auth?.toLowerCase().startsWith("bearer ")) {
    const token = auth.slice(7).trim();
    if (token) return token;
  }

  return null;
}

function secretsMatch(provided: string, expected: string): boolean {
  if (provided.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < provided.length; i += 1) {
    mismatch |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function GET(request: Request) {
  const expected = process.env.ATLAS_LOG_SECRET?.trim();
  if (!expected) {
    return NextResponse.json(
      { error: "Atlas inbox is not configured." },
      { status: 503 },
    );
  }

  const provided = readSecret(request);
  if (!provided || !secretsMatch(provided, expected)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!isAtlasLogConfigured()) {
    return NextResponse.json(
      {
        error:
          "Question storage is not configured. Connect Upstash Redis (KV_REST_API_URL / KV_REST_API_TOKEN).",
        entries: [],
        storageConfigured: false,
      },
      { status: 503 },
    );
  }

  try {
    const entries = await listAtlasQuestions(100);
    return NextResponse.json({
      entries,
      storageConfigured: true,
    });
  } catch (error) {
    console.error("Atlas log read failed", error);
    return NextResponse.json(
      { error: "Could not load questions." },
      { status: 502 },
    );
  }
}
