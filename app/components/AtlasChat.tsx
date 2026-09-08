"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import AtlasDog from "./AtlasDog";

export const ASSISTANT_NAME = "Atlas";

type ChatMessage = { id: string; role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Walk me through the SF Restaurant Safety Map.",
  "What has Roy built with Python and SQL?",
  "What kind of roles is Roy targeting?",
  "What does Roy do outside of work?",
] as const;

const AVATAR_PX = 34;
const MASCOT_PX = 152;
const TEXTAREA_MAX_HEIGHT_PX = 132;

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isLoadingRef = useRef(false);
  const messageIdRef = useRef(0);
  const messagesRef = useRef<ChatMessage[]>([]);

  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const nextHeight = Math.min(el.scrollHeight, TEXTAREA_MAX_HEIGHT_PX);
    el.style.height = `${nextHeight}px`;
    el.style.overflowY =
      el.scrollHeight > TEXTAREA_MAX_HEIGHT_PX ? "auto" : "hidden";
  };

  useEffect(() => {
    // Only pin to the latest message once a conversation has started.
    // Scrolling on the empty welcome state clips the bubble at the top.
    if (messages.length === 0 && !isLoading) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    resizeTextarea();
  }, [input]);

  const sendMessage = async (rawText: string) => {
    const content = rawText.trim();
    if (!content || isLoadingRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);
    setInput("");
    setError(null);

    const userMessage: ChatMessage = {
      id: `msg-${++messageIdRef.current}`,
      role: "user",
      content,
    };

    // Build the next history locally from the ref (always current), not from
    // a possibly-stale render closure or a deferred setState updater.
    const nextMessages = [...messagesRef.current, userMessage];
    messagesRef.current = nextMessages;
    setMessages(nextMessages);

    const payload = nextMessages
      .filter((message) => message.content.trim().length > 0)
      .map(({ role, content: text }) => ({ role, content: text }));

    console.log("[AtlasChat] outgoing payload", payload);

    try {
      const response = await fetch("/api/atlas", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: payload }),
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

      const reply = (data.reply ?? "").trim();
      if (!reply) {
        setError("Something went wrong. Please try again later.");
        return;
      }

      const assistantMessage: ChatMessage = {
        id: `msg-${++messageIdRef.current}`,
        role: "assistant",
        content: reply,
      };
      const withReply = [...messagesRef.current, assistantMessage];
      messagesRef.current = withReply;
      setMessages(withReply);
    } catch {
      setError("Something went wrong. Please try again later.");
    } finally {
      isLoadingRef.current = false;
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
  const isEmpty = messages.length === 0 && !isLoading;

  const composer = (
    <div className="shrink-0 border-t border-slate-100 px-4 pb-4 pt-3 dark:border-slate-700/80 sm:px-6 sm:pb-5 sm:pt-4">
      {error && (
        <p
          role="alert"
          className="mb-3 text-left text-sm text-rose-600 dark:text-rose-400"
        >
          {error}
        </p>
      )}
      <div className="flex items-end gap-3">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          maxLength={500}
          disabled={isLoading}
          placeholder={`Ask ${ASSISTANT_NAME} about Roy…`}
          aria-label={`Message ${ASSISTANT_NAME}`}
          className="max-h-[132px] min-h-[2.5rem] flex-1 resize-none overflow-y-hidden rounded-xl border border-sky-200 bg-white px-4 py-2.5 text-sm leading-snug text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-sky-500 dark:focus:ring-sky-900/40 sm:text-base"
        />
        <button
          type="button"
          onClick={() => void sendMessage(input)}
          disabled={!canSend}
          aria-label={`Send message to ${ASSISTANT_NAME}`}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl !bg-[#E8A33D] text-white transition-colors duration-200 ease-out hover:enabled:!bg-[#C8891F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]/55 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:!bg-[#E8A33D] disabled:opacity-55 dark:focus-visible:ring-offset-slate-900"
        >
          <Send className="h-4 w-4 text-white" aria-hidden strokeWidth={2.25} />
        </button>
      </div>
      <p className="mt-1.5 text-left text-xs leading-relaxed text-slate-500 dark:text-slate-400">
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
  );

  return (
    <div className="mt-8 w-full text-left md:mt-10">
      <div
        className={`flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(15,40,70,0.08)] dark:bg-slate-800/70 dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)] ${
          isEmpty ? "" : "h-[min(70vh,36rem)] md:h-auto md:min-h-[480px]"
        }`}
      >
        {isEmpty ? (
          <div className="flex flex-col px-4 pb-[88px] pt-6 sm:px-6 sm:pt-8">
            <div className="flex flex-col items-center text-center">
              <div className="relative z-10 mx-auto w-fit max-w-[18rem] rounded-2xl bg-[var(--bubble-fill)] px-2.5 py-2 text-sm leading-relaxed text-slate-600 sm:max-w-xs sm:text-[0.9375rem] dark:text-slate-300 [--bubble-fill:#F0F9FF] dark:[--bubble-fill:rgb(14_165_233/0.12)]">
                <p className="relative z-10">
                  Ask me anything about Roy&apos;s background, projects, or
                  experience.
                </p>
                <svg
                  aria-hidden
                  viewBox="0 0 40 16"
                  width="36"
                  height="14"
                  overflow="visible"
                  className="pointer-events-none absolute left-[60%] top-full z-0 -translate-x-[75%]"
                >
                  <path
                    d="M 26 0
                       C 24 4, 19 8, 14 12
                       C 11 14, 9 15, 8 15.5
                       C 12 13, 22 7, 30 3
                       C 32 1.5, 33 0.5, 34 0
                       Z"
                    fill="var(--bubble-fill)"
                  />
                </svg>
              </div>

              <div className="atlas-idle-float relative z-20 mt-5 sm:mt-6">
                <AtlasDog size={MASCOT_PX} pettable />
              </div>

              <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Feel free to pet Atlas!
              </p>
            </div>

            <div className="mx-auto mt-8 grid w-full max-w-2xl grid-cols-1 gap-2.5 sm:mt-10 sm:grid-cols-2 sm:gap-2.5">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => void sendMessage(suggestion)}
                  disabled={isLoading}
                  className="flex min-h-[3.75rem] w-full items-center rounded-lg bg-sky-50 px-3 py-2 text-left text-xs font-medium leading-snug text-sky-950 transition-colors duration-200 ease-out hover:bg-[#FFF3E2] hover:shadow-[0_0_0_1px_rgba(232,163,61,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]/35 focus-visible:ring-offset-2 disabled:opacity-60 sm:min-h-[4.25rem] sm:text-sm dark:bg-sky-950/40 dark:text-sky-100 dark:hover:bg-[#E8A33D]/15 dark:hover:shadow-[0_0_0_1px_rgba(232,163,61,0.35)] dark:focus-visible:ring-offset-slate-900"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
            {messages.map((message, index) => {
              if (message.role === "user") {
                return (
                  <motion.div
                    key={message.id}
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
                  key={message.id}
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
            <div ref={bottomRef} />
          </div>
        )}

        {composer}
      </div>
    </div>
  );
}
