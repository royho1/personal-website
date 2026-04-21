"use client";

import { Eye } from "lucide-react";
import { motion } from "framer-motion";

/*
 * Drowsy Driver Detection animation sequence (7.5s cycle, all keyframes share the same
 * timebase so everything stays in sync).
 *
 *   0.0s – 2.0s: open blue eye holds
 *   2.0s – 3.0s: open eye squeezes + fades while the closed arc expands + fades in
 *                 (the two shapes cross-fade and co-scale, so it reads as a morph)
 *   3.0s – 5.0s: closed arc holds, 3 Z's fade in, drift upward, and fade out in a
 *                 staggered chain with overlapping lifespans and slightly different drift
 *   5.0s – 6.0s: 3 rapid red glow pulses around the closed arc
 *   6.0s – 6.7s: closed arc squeezes + fades while the open eye expands + fades in with
 *                 a subtle overshoot pop (morph back to open)
 *   6.7s – 7.5s: open eye settles and holds, then loops
 */
const CYCLE = 7.5;
const NAVY = "#0c4a6e";

const t = (seconds: number) => seconds / CYCLE;

// ---------- Open eye (Lucide Eye) ----------
const openEyeTimes = [
  0,
  t(2.0),
  t(3.0),
  t(6.0),
  t(6.3),
  t(6.5),
  t(6.7),
  1,
];
const openEyeAnimate = {
  opacity: [1, 1, 0, 0, 0.7, 1, 1, 1],
  scaleY: [1, 1, 0.25, 0.25, 0.85, 1.08, 1, 1],
};

// ---------- Closed eye (downward arc) ----------
const closedEyeTimes = [
  0,
  t(2.0),
  t(3.0),
  t(6.0),
  t(6.3),
  t(6.5),
  1,
];
const closedEyeAnimate = {
  opacity: [0, 0, 1, 1, 0.4, 0, 0],
  scaleY: [0.25, 0.25, 1, 1, 0.75, 0.25, 0.25],
};

// ---------- Red alert glow: 3 sharp pulses at 5.2s, 5.5s, 5.8s ----------
const glowTimes = [
  0,
  t(5.0),
  t(5.2),
  t(5.35),
  t(5.5),
  t(5.65),
  t(5.8),
  t(5.95),
  t(6.0),
  1,
];
const glowAnimate = {
  opacity: [0, 0, 0.9, 0.25, 0.9, 0.25, 0.9, 0.4, 0, 0],
  scale: [0.9, 0.9, 1.25, 1.05, 1.25, 1.05, 1.25, 1.1, 0.9, 0.9],
};

// ---------- Z's: gentle fade in, continuous upward drift, gentle fade out ----------
type ZConfig = {
  sizeClass: string;
  colorClass: string;
  rightClass: string;
  startAt: number;
  peakAt: number;
  fadeAt: number;
  endAt: number;
  driftX: number;
  driftY: number;
};

const zs: ZConfig[] = [
  {
    sizeClass: "text-base",
    colorClass: "text-sky-400",
    rightClass: "right-0",
    startAt: t(3.0),
    peakAt: t(4.0),
    fadeAt: t(4.2),
    endAt: t(4.5),
    driftX: 8,
    driftY: -30,
  },
  {
    sizeClass: "text-xl",
    colorClass: "text-sky-500",
    rightClass: "right-1",
    startAt: t(3.3),
    peakAt: t(4.3),
    fadeAt: t(4.5),
    endAt: t(4.8),
    driftX: 12,
    driftY: -36,
  },
  {
    sizeClass: "text-2xl",
    colorClass: "text-sky-600",
    rightClass: "right-2",
    startAt: t(3.6),
    peakAt: t(4.6),
    fadeAt: t(4.8),
    endAt: t(5.0),
    driftX: 16,
    driftY: -42,
  },
];

function ClosedEyeShape() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-14 w-14"
      aria-hidden
    >
      {/* Upside-down U: closed eye curving downward */}
      <path d="M 4 15 Q 12 9 20 15" />
      {/* Eyelashes dropping down from the arc */}
      <path d="M 4 15 L 3 17" />
      <path d="M 8 12.75 L 7 14.75" />
      <path d="M 16 12.75 L 17 14.75" />
      <path d="M 20 15 L 21 17" />
    </svg>
  );
}

export default function DrowsyEyeIcon() {
  return (
    <div
      className="relative flex h-14 w-14 items-center justify-center"
      aria-hidden
    >
      {/* Red alert glow */}
      <motion.span
        className="pointer-events-none absolute -inset-4 rounded-full bg-red-500 blur-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={glowAnimate}
        transition={{
          duration: CYCLE,
          times: glowTimes,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Open eye (cross-fades with closed eye, co-scales for smooth morph) */}
      <motion.div
        className="absolute inset-0 flex origin-center items-center justify-center"
        style={{ color: NAVY }}
        initial={{ opacity: 1, scaleY: 1 }}
        animate={openEyeAnimate}
        transition={{
          duration: CYCLE,
          times: openEyeTimes,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <Eye className="h-14 w-14" strokeWidth={1.75} />
      </motion.div>

      {/* Closed eye */}
      <motion.div
        className="absolute inset-0 flex origin-center items-center justify-center"
        style={{ color: NAVY }}
        initial={{ opacity: 0, scaleY: 0.25 }}
        animate={closedEyeAnimate}
        transition={{
          duration: CYCLE,
          times: closedEyeTimes,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <ClosedEyeShape />
      </motion.div>

      {/* Z's */}
      {zs.map((z, i) => (
        <motion.span
          key={i}
          className={`pointer-events-none absolute top-0 ${z.rightClass} ${z.sizeClass} ${z.colorClass} font-bold leading-none`}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.55 }}
          animate={{
            opacity: [0, 0, 0, 1, 1, 0, 0],
            x: [
              0,
              0,
              0,
              z.driftX * 0.5,
              z.driftX * 0.85,
              z.driftX,
              z.driftX,
            ],
            y: [
              0,
              0,
              0,
              z.driftY * 0.4,
              z.driftY * 0.75,
              z.driftY,
              z.driftY,
            ],
            scale: [0.55, 0.55, 0.55, 0.95, 1.08, 1.15, 1.15],
          }}
          transition={{
            duration: CYCLE,
            times: [
              0,
              Math.max(0, z.startAt - 0.008),
              z.startAt,
              z.peakAt,
              z.fadeAt,
              z.endAt,
              1,
            ],
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          Z
        </motion.span>
      ))}
    </div>
  );
}
