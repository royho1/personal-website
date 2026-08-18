"use client";

import type { MouseEvent, ReactNode } from "react";
import { fireConfettiFromElement } from "../lib/confetti";

/**
 * Wraps the contact card so pressing it sets off the same confetti burst as
 * the hero's availability badge. Purely decorative, so it stays a plain
 * container rather than taking on button semantics that would compete with
 * the real links nested inside it.
 */
export default function ContactCard({ children }: { children: ReactNode }) {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    // Presses that land on a link or button belong to that control, so let it
    // do its own thing (mailto, socials, vCard download) without a burst.
    if ((event.target as HTMLElement).closest("a, button")) return;

    fireConfettiFromElement(event.currentTarget);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative mt-12 cursor-pointer rounded-2xl border border-sky-200 bg-white p-8 shadow-sm shadow-sky-900/10 ring-1 ring-sky-200/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-10 dark:border-slate-700 dark:bg-slate-800/80 dark:shadow-black/40 dark:ring-slate-700/50"
    >
      {children}
    </div>
  );
}
