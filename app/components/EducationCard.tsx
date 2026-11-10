"use client";

import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { useId, useRef, type PointerEvent } from "react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600"],
});

const MAX_TILT_DEG = 6;
const RETURN_MS = 400;

function canTilt() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function DiplomaSeal() {
  const id = useId();
  const faceId = `${id}-face`;
  const ribbonId = `${id}-ribbon`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 44 60"
      className="pointer-events-none absolute right-[18px] top-[18px] h-[60px] w-[44px] drop-shadow-[0_2px_3px_rgba(120,90,30,0.3)]"
    >
      <defs>
        <linearGradient id={faceId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E6C77A" />
          <stop offset="1" stopColor="#B8913E" />
        </linearGradient>
        <linearGradient id={ribbonId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C9A85C" />
          <stop offset="1" stopColor="#A47F33" />
        </linearGradient>
      </defs>
      <polygon points="14,34 22,38 18.5,59 14.5,54 10,57.5" fill={`url(#${ribbonId})`} />
      <polygon points="30,34 22,38 25.5,59 29.5,54 34,57.5" fill={`url(#${ribbonId})`} />
      <circle cx="22" cy="22" r="22" fill={`url(#${faceId})`} />
      <circle cx="22" cy="22" r="18" fill="none" stroke="#FFFFFF" strokeOpacity="0.65" strokeWidth="1" />
      <polygon
        points="22,14 24,19.25 29.61,19.53 25.23,23.05 26.7,28.47 22,25.4 17.3,28.47 18.77,23.05 14.39,19.53 20,19.25"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export default function EducationCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const resetTimerRef = useRef<number | null>(null);

  const activate = (card: HTMLDivElement) => {
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
    card.style.transition = "transform 120ms ease-out";
    if (card.style.willChange === "transform") return;
    card.style.willChange = "transform";
    card.style.transformStyle = "preserve-3d";
  };

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || event.pointerType !== "mouse" || !canTilt()) return;
    activate(card);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || event.pointerType !== "mouse" || !canTilt()) return;
    activate(card);
    const { clientX, clientY } = event;
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const rect = card.getBoundingClientRect();
      const x = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      const y = Math.min(Math.max((clientY - rect.top) / rect.height, 0), 1);
      const rotateY = (x - 0.5) * 2 * MAX_TILT_DEG;
      const rotateX = (0.5 - y) * 2 * MAX_TILT_DEG;
      card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      card.style.setProperty("--glare-x", `${(x * 100).toFixed(1)}%`);
      card.style.setProperty("--glare-y", `${(y * 100).toFixed(1)}%`);
      card.style.setProperty("--glare-opacity", "1");
    });
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    card.style.transition = `transform ${RETURN_MS}ms ease-out`;
    card.style.transform = "";
    card.style.setProperty("--glare-opacity", "0");
    resetTimerRef.current = window.setTimeout(() => {
      resetTimerRef.current = null;
      card.style.willChange = "";
      card.style.transformStyle = "";
      card.style.transition = "";
    }, RETURN_MS);
  };

  return (
    <div
      ref={cardRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative rounded-xl border border-sky-200 bg-gradient-to-br from-white to-[#FBF8F1] p-6 shadow-[0_14px_34px_-14px_rgba(14,80,120,0.28),0_3px_8px_-3px_rgba(14,80,120,0.1)] sm:p-7 dark:border-slate-700 dark:from-slate-800/70 dark:to-slate-800/70 dark:shadow-[0_16px_36px_-14px_rgba(0,0,0,0.6),0_3px_8px_-3px_rgba(0,0,0,0.35)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[10px] rounded-[2px] border border-[#C9A85C]/50 dark:border-[#C9A85C]/35"
      />
      <DiplomaSeal />

      <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 sm:text-sm dark:text-slate-400">
        Education
      </h3>
      <div className="mt-3 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:pr-14">
        <div className="shrink-0 dark:rounded-lg dark:bg-white dark:p-2">
          <Image
            src="/logos/ucdavis.png"
            alt="UC Davis logo"
            width={1008}
            height={168}
            className="h-auto w-20 sm:w-24"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className={`${cormorant.className} text-[1.375rem] font-semibold leading-tight text-sky-950 dark:text-sky-100`}
          >
            University of California, Davis
          </p>
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-slate-700 sm:text-sm dark:text-slate-300">
            B.S. Statistical Data&nbsp;Science, Minor in Computer&nbsp;Science
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            September 2022 to March 2026
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="edu-card-glare pointer-events-none absolute inset-0 rounded-xl"
      />
    </div>
  );
}
