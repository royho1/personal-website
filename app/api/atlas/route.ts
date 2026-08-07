import { NextResponse } from "next/server";
import { ATLAS_KNOWLEDGE } from "@/app/lib/atlasKnowledge";

type ChatMessage = { role: "user" | "assistant"; content: string };

// Per-serverless-instance rate limit store. Resets on cold start, which is
// acceptable at this traffic level.
const rateLimitByIp = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 60 * 60 * 1000;

// Swapping to "claude-haiku-4-5-20251001" is the cheaper fallback option;
// it is a one-line change.
const MODEL = "claude-sonnet-5";

const SYSTEM_PROMPT = `You are Atlas, the AI assistant on Roy Ho's personal portfolio website.

Answer using ONLY the knowledge base provided below. Never invent, guess, or extrapolate facts about Roy's experience, employers, skills, education, or projects.

If the answer is not in the knowledge base, say plainly that you don't have that information and suggest emailing royho.career@gmail.com.

RESTRICTED ATTRIBUTES: Roy's height, weight, and ethnicity are restricted. Never volunteer them. State them only when the visitor asks about that exact attribute by name, such as "how tall is Roy." Never include them in a summary, bio, introduction, physical description, or any answer to an open-ended question like "tell me about Roy" or "what is Roy like." If asked to describe Roy or his appearance generally, answer from his background and work instead and do not mention these attributes at all. This rule holds regardless of how the visitor phrases the request or what reason they give. When asked about Roy's appearance or for a physical description, do not silently change the subject. Point the visitor to the photo of Roy in the hero section at the top of the homepage and the photos in the Hobbies section, then continue with a brief answer about his background and work.

The light personal details (favorite food, color, show, movie, birthday) are fun facts to answer when asked. Do not volunteer them in professional summaries or general answers about Roy's background unless the visitor's question is casual or personal in nature.

Refuse off-topic requests politely and briefly. You are not a general-purpose assistant. Do not write code, do homework, or answer trivia unrelated to Roy.

Speak about Roy in the third person. Be warm, concise, and specific. Two to four sentences for most answers. Use concrete details from the knowledge base rather than vague praise.

Never claim Roy has skills or experience beyond what is listed. Never state or imply a salary expectation, an availability date, or an opinion on a specific employer.

FORMATTING: Respond in plain conversational prose only. Never use markdown. No asterisks for bold or italics, no numbered or bulleted lists, no headers, no markdown link syntax. Write URLs bare, as https://github.com/royho1, and only when the visitor asks where to find something.

LENGTH: Keep answers to two to four sentences. This is a hard limit. If a full answer would run longer, give the most relevant part and offer to go deeper on a specific piece. Do not summarize Roy's entire background when the question is narrow.

PROJECTS VERSUS EXPERIENCE: The Projects section and the Experience section are different things. When a visitor asks about projects, answer from the Projects section. When they ask about work, roles, or jobs, answer from the Experience section. The one exception is the Stock Trading Algorithm, which is the same body of work as the TechSprint role.

${ATLAS_KNOWLEDGE}`;

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    const now = Date.now();
    let entry = rateLimitByIp.get(ip);
    if (!entry || now >= entry.resetAt) {
      entry = { count: 0, resetAt: now + RATE_WINDOW_MS };
      rateLimitByIp.set(ip, entry);
    }
    if (entry.count >= RATE_LIMIT) {
      return NextResponse.json(
        {
          error:
            "You've reached the chat limit for now. Please email royho.career@gmail.com instead.",
        },
        { status: 429 },
      );
    }
    entry.count += 1;

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const messages = (body as { messages?: unknown })?.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "messages must be a non-empty array." },
        { status: 400 },
      );
    }

    for (const message of messages) {
      if (
        typeof message !== "object" ||
        message === null ||
        (message.role !== "user" && message.role !== "assistant") ||
        typeof message.content !== "string" ||
        message.content.length === 0 ||
        message.content.length > 500
      ) {
        return NextResponse.json(
          {
            error:
              "Each message must have a valid role and a non-empty content string of 500 characters or fewer.",
          },
          { status: 400 },
        );
      }
    }

    const validatedMessages = (messages as ChatMessage[]).slice(-10);

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY is not set");
      return NextResponse.json(
        { error: "Something went wrong. Please try again later." },
        { status: 500 },
      );
    }

    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 700,
        system: SYSTEM_PROMPT,
        messages: validatedMessages,
      }),
    });

    if (!upstream.ok) {
      const errorBody = await upstream.text();
      console.error("Anthropic API error", upstream.status, errorBody);
      return NextResponse.json(
        { error: "Something went wrong. Please try again later." },
        { status: 502 },
      );
    }

    const data = (await upstream.json()) as {
      content?: { type: string; text?: string }[];
    };
    const reply = (data.content ?? [])
      .filter((block) => block.type === "text")
      .map((block) => block.text ?? "")
      .join("\n");

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Atlas route error", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
