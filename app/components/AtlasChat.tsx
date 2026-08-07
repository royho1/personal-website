"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import AtlasDog from "./AtlasDog";

export const ASSISTANT_NAME = "Atlas";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What's Roy's experience with SQL and Python?",
  "Tell me about Solstice.",
  "What did Roy study at UC Davis?",
  "Is Roy a good fit for a data engineer role?",
] as const;

const AVATAR_PX = 34;

function AssistantAvatar({ visible }: { visible: boolean }) {
  if (!visible) {
    return (
      <div
        className="shrink-0"
        style={{ width: AVATAR_PX, height: AVATAR_PX }}
        aria-hidden
      />
    );
  }

  return (
    <div
      className="flex shrink-0 items-end justify-center overflow-hidden rounded-full bg-sky-100 dark:bg-slate-700"
      style={{ width: AVATAR_PX, height: AVATAR_PX }}
    >
      <AtlasDog variant="head" size={AVATAR_PX} />
    </div>
  );
}

export default function AtlasChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (rawText: string) => {
    const content = rawText.trim();
    if (!content || isLoading) return;

    const updatedMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content },
    ];
    setMessages(updatedMessages);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/atlas", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = (await response.json()) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok) {
        setError(
          data.error ?? "Something went wrong. Please try again later.",
        );
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? "" },
      ]);
    } catch {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  };

  const canSend = input.trim().length > 0 && !isLoading;

  return (
    <div className="mt-10 w-full text-left">
      <div className="flex h-[min(70vh,36rem)] flex-col overflow-hidden rounded-2xl border border-sky-200 bg-white/90 shadow-sm shadow-sky-900/10 ring-1 ring-sky-200/90 dark:border-slate-700 dark:bg-slate-800/70 dark:shadow-black/40 dark:ring-slate-700/50">
        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
          {messages.length === 0 && !isLoading ? (
            <div className="flex h-full flex-col items-center justify-center gap-6 px-2 text-center">
              <AtlasDog size={96} />
              <p className="max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Ask me anything about Roy&apos;s background, projects, or
                experience.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void sendMessage(suggestion)}
                    disabled={isLoading}
                    className="rounded-full border border-sky-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-900 sm:text-sm dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-sky-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => {
                if (message.role === "user") {
                  return (
                    <motion.div
                      key={`${message.role}-${index}`}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[85%] rounded-2xl bg-sky-600 px-4 py-3 text-sm leading-relaxed text-white shadow-sm shadow-sky-600/25 sm:text-base dark:bg-sky-500">
                        {message.content}
                      </div>
                    </motion.div>
                  );
                }

                const showAvatar =
                  index === 0 || messages[index - 1]?.role !== "assistant";

                return (
                  <motion.div
                    key={`${message.role}-${index}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex items-end gap-2"
                  >
                    <AssistantAvatar visible={showAvatar} />
                    <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl border border-sky-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-900 shadow-sm shadow-sky-900/10 sm:text-base dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200 dark:shadow-black/40">
                      {message.content}
                    </div>
                  </motion.div>
                );
              })}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex items-end gap-2"
                  aria-live="polite"
                  aria-label={`${ASSISTANT_NAME} is thinking`}
                >
                  <AssistantAvatar visible />
                  <div className="inline-flex items-center gap-3 rounded-2xl border border-sky-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm shadow-sky-900/10 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300 dark:shadow-black/40">
                    <span className="flex items-center gap-1" aria-hidden>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-600 [animation-delay:-0.3s] dark:bg-sky-400" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-600 [animation-delay:-0.15s] dark:bg-sky-400" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-600 dark:bg-sky-400" />
                    </span>
                    <span>{ASSISTANT_NAME} is thinking</span>
                  </div>
                </motion.div>
              )}
            </>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-sky-200/80 bg-sky-50/60 p-4 dark:border-slate-700 dark:bg-slate-900/50 sm:p-5">
          {error && (
            <p
              role="alert"
              className="mb-3 text-sm text-rose-600 dark:text-rose-400"
            >
              {error}
            </p>
          )}
          <div className="flex items-end gap-3">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              maxLength={500}
              disabled={isLoading}
              placeholder={`Ask ${ASSISTANT_NAME} about Roy…`}
              aria-label={`Message ${ASSISTANT_NAME}`}
              className="min-h-[2.75rem] flex-1 resize-none rounded-xl border border-sky-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm shadow-sky-900/5 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-sky-500 dark:focus:ring-sky-900/40 sm:text-base"
            />
            <button
              type="button"
              onClick={() => void sendMessage(input)}
              disabled={!canSend}
              aria-label={`Send message to ${ASSISTANT_NAME}`}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm shadow-sky-600/25 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-sky-700 disabled:pointer-events-none disabled:opacity-40 dark:bg-sky-500 dark:shadow-sky-950/40 dark:hover:bg-sky-400"
            >
              <Send className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <p className="mt-3 text-center text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            {ASSISTANT_NAME} is an AI and can make mistakes. For anything
            important, email{" "}
            <a
              href="mailto:royho.career@gmail.com"
              className="underline underline-offset-2 transition-colors hover:text-sky-800 dark:hover:text-sky-300"
            >
              royho.career@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
