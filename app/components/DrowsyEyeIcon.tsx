"use client";

import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

/*
 * Drowsy Driver Detection – one continuous 8s animation.
 *
 *   0.0s – 1.0s: fully open blue eye (pupil visible)
 *   1.0s – 1.3s: first quick blink (smooth close + reopen)
 *   1.5s – 1.8s: second quick blink
 *   2.0s – 2.5s: eye smoothly closes into a relaxed downward arc
 *   2.5s – 5.0s: eye stays closed; three Z's fade in, drift upward with a gentle
 *                sway, and fade out one after another
 *   5.0s – 6.0s: soft red radial glow pulses three times around the closed eye
 *   6.0s – 6.4s: glow fades out while the eye quickly snaps back open
 *   6.4s – 8.0s: eye stays open and alert, then the whole sequence loops
 *
 * The eye is drawn as two quadratic-Bézier eyelids + a pupil. A single motion
 * value (`openness`, 0 → 1) drives both the upper/lower eyelid control-point y
 * coordinates and the pupil opacity, so the shape continuously morphs instead
 * of snapping between discrete states.
 */
const CYCLE = 8;
const NAVY = "#0c4a6e";

/** Convert seconds → normalized 0..1 position in the cycle. */
const t = (seconds: number) => seconds / CYCLE;

// Eyelid control-point y-values in the 24-unit viewBox.
const UPPER_OPEN = 4; // upper lid peaks high
const LOWER_OPEN = 20; // lower lid dips low
const MEET_Y = 16; // both lids converge to this gentle downward arc when closed

type ZConfig = {
  sizeClass: string;
  colorClass: string;
  positionClass: string;
  start: number;
  peakIn: number;
  peakOut: number;
  end: number;
  driftX: number[];
  driftY: number[];
};

// Classic cartoon sleep-Z's: each Z pops in just above-right of the closed eye,
// drifts diagonally up-and-right while growing from ~12px to ~24px, then fades.
// All three share the same text-2xl base size (24px at scale 1.0) and scale
// from ~0.5 → ~1.0 via the keyframes below. Starting anchors sit inside the
// 80px eye box and drift distances are chosen so every Z stays inside the
// 112px card banner (banner top is ~16px above the container top).
const zs: ZConfig[] = [
  {
    sizeClass: "text-2xl",
    colorClass: "text-sky-500",
    positionClass: "top-8 right-3",
    start: t(2.5),
    peakIn: t(2.9),
    peakOut: t(3.5),
    end: t(3.8),
    driftX: [0, 0, 6, 14, 20, 20],
    driftY: [0, 0, -8, -16, -22, -22],
  },
  {
    sizeClass: "text-2xl",
    colorClass: "text-sky-600",
    positionClass: "top-10 right-2",
    start: t(3.0),
    peakIn: t(3.4),
    peakOut: t(4.0),
    end: t(4.3),
    driftX: [0, 0, 7, 16, 24, 24],
    driftY: [0, 0, -9, -18, -26, -26],
  },
  {
    sizeClass: "text-2xl",
    colorClass: "text-sky-400",
    positionClass: "top-9 right-4",
    start: t(3.5),
    peakIn: t(3.9),
    peakOut: t(4.5),
    end: t(4.8),
    driftX: [0, 0, 5, 12, 18, 18],
    driftY: [0, 0, -7, -15, -21, -21],
  },
];

export default function DrowsyEyeIcon() {
  const openness = useMotionValue(1);

  // Eyelid control-point y's, pupil opacity — all derived from `openness`.
  const upperY = useTransform(openness, [0, 1], [MEET_Y, UPPER_OPEN]);
  const lowerY = useTransform(openness, [0, 1], [MEET_Y, LOWER_OPEN]);
  const pupilOpacity = useTransform(openness, [0, 0.4, 1], [0, 0, 1]);

  // Two quadratic curves sharing endpoints (3,12) and (21,12). The control
  // point y is driven by `openness`, which is how the eye actually morphs.
  const upperD = useTransform(
    upperY,
    (y) => `M 3 12 Q 12 ${y.toFixed(2)} 21 12`,
  );
  const lowerD = useTransform(
    lowerY,
    (y) => `M 3 12 Q 12 ${y.toFixed(2)} 21 12`,
  );

  useEffect(() => {
    const controls = animate(
      openness,
      // open | hold | blink1 | hold | blink2 | hold | close | hold closed | open | hold
      [1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1],
      {
        duration: CYCLE,
        times: [
          0,
          t(1.0),
          t(1.15),
          t(1.3),
          t(1.5),
          t(1.65),
          t(1.8),
          t(2.0),
          t(2.5),
          t(6.0),
          t(6.4),
          1,
        ],
        ease: "easeInOut",
        repeat: Infinity,
      },
    );
    return () => controls.stop();
  }, [openness]);

  return (
    <div
      className="relative flex h-20 w-20 items-center justify-center"
      aria-hidden
    >
      {/* Soft red alert glow — 3 pulses over 5–6.5s, fully faded by 7s */}
      <motion.span
        className="pointer-events-none absolute -inset-4 rounded-full bg-red-500 blur-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: [0, 0, 0.85, 0.35, 0.85, 0.35, 0.9, 0, 0],
          scale: [0.9, 0.9, 1.2, 1.05, 1.2, 1.05, 1.25, 0.9, 0.9],
        }}
        transition={{
          duration: CYCLE,
          times: [
            0,
            t(5.0),
            t(5.2),
            t(5.4),
            t(5.6),
            t(5.8),
            t(6.0),
            t(6.4),
            1,
          ],
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Morphing eye: two eyelid paths + pupil, all driven by `openness` */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={NAVY}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative h-20 w-20"
      >
        <motion.path d={upperD} />
        <motion.path d={lowerD} />
        <motion.circle
          cx="12"
          cy="12"
          r="3"
          fill="none"
          style={{ opacity: pupilOpacity }}
        />
      </svg>

      {/* Z's — smooth fade in, drift upward with a gentle sway, smooth fade out */}
      {zs.map((z, i) => (
        <motion.span
          key={i}
          className={`pointer-events-none absolute ${z.positionClass} ${z.sizeClass} ${z.colorClass} font-bold leading-none`}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0, 1, 1, 0, 0],
            x: z.driftX,
            y: z.driftY,
            scale: [0.5, 0.5, 0.65, 0.88, 1.0, 1.0],
          }}
          transition={{
            duration: CYCLE,
            times: [
              0,
              Math.max(0, z.start - 0.005),
              z.peakIn,
              z.peakOut,
              z.end,
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
