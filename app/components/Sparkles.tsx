"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Soft "diamond glint" effect: a handful of tiny four-point stars that
 * twinkle independently at random spots along the edges of the parent.
 * Drop it inside any `position: relative` container — it covers the
 * element with `absolute inset-0` and ignores pointer events.
 */

type SparkleConfig = {
  id: number;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
};

type SparkleSizeRange = readonly [number, number];

const DEFAULT_SIZE_RANGE: SparkleSizeRange = [20, 32];

// Module-level counter so each new config has a unique, stable key that
// forces the motion.span to remount (and restart its animation) without
// needing AnimatePresence.
let sparkleUid = 0;

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/** Render a signed px offset inside a CSS calc() expression. */
function signedPx(value: number): string {
  return value >= 0 ? `+ ${value}px` : `- ${-value}px`;
}

/** Pick a fresh spot along one of the four edges with a small perpendicular
 * jitter so sparkles feel organic rather than pinned exactly to the border.
 * The jitter is expressed in pixels so the sparkle band stays a predictable
 * thickness regardless of the parent element's size. */
function makeConfig(sizeRange: SparkleSizeRange): SparkleConfig {
  const side = Math.floor(Math.random() * 4);
  const along = Math.random() * 100;
  const jitter = Math.round(randomBetween(-8, 8));

  let top: string;
  let left: string;
  if (side === 0) {
    top = `${jitter}px`;
    left = `${along}%`;
  } else if (side === 1) {
    top = `${along}%`;
    left = `calc(100% ${signedPx(-jitter)})`;
  } else if (side === 2) {
    top = `calc(100% ${signedPx(-jitter)})`;
    left = `${along}%`;
  } else {
    top = `${along}%`;
    left = `${jitter}px`;
  }

  return {
    id: ++sparkleUid,
    top,
    left,
    size: Math.round(randomBetween(sizeRange[0], sizeRange[1])),
    duration: randomBetween(2.2, 3),
    delay: randomBetween(3, 6),
    rotate: Math.round(randomBetween(-30, 30)),
  };
}

function SparkleShape({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0 L13 11 L24 12 L13 13 L12 24 L11 13 L0 12 L11 11 Z" />
    </svg>
  );
}

function Sparkle({ sizeRange }: { sizeRange: SparkleSizeRange }) {
  const [config, setConfig] = useState<SparkleConfig>(() =>
    makeConfig(sizeRange),
  );

  return (
    <span
      className="absolute"
      style={{
        top: config.top,
        left: config.left,
        // Centre the sparkle on its (top,left) anchor via a plain CSS
        // transform so Framer Motion's scale/rotate can run freely on
        // the child without stomping the translate.
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.span
        key={config.id}
        className="block text-white"
        style={{
          filter:
            "drop-shadow(0 0 6px rgba(255,255,255,0.9)) drop-shadow(0 0 14px rgba(186,230,253,0.6))",
        }}
        initial={{ opacity: 0, scale: 0.3, rotate: config.rotate }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.3, 1, 1.15, 0.3],
          rotate: [config.rotate, config.rotate + 45],
        }}
        transition={{
          duration: config.duration,
          delay: config.delay,
          times: [0, 0.4, 0.6, 1],
          ease: "easeInOut",
        }}
        onAnimationComplete={() => setConfig(makeConfig(sizeRange))}
      >
        <SparkleShape size={config.size} />
      </motion.span>
    </span>
  );
}

type SparklesProps = {
  count?: number;
  /** Pixels to extend the sparkle band beyond the parent's bounds. Use this
   * to place sparkles just OUTSIDE an element instead of along its border. */
  bleed?: number;
  /** Min/max sparkle icon size in pixels. Each sparkle picks a random
   * value from this range each cycle. */
  sizeRange?: SparkleSizeRange;
};

export default function Sparkles({
  count = 3,
  bleed = 0,
  sizeRange = DEFAULT_SIZE_RANGE,
}: SparklesProps) {
  // Each sparkle's position/size/timing is randomised, which would cause a
  // hydration mismatch if the markup rendered on the server didn't line up
  // with the client-side randoms. Defer rendering until after mount so the
  // server just emits an empty wrapper and the client fills it in.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <span
      className="pointer-events-none absolute"
      style={{
        top: -bleed,
        right: -bleed,
        bottom: -bleed,
        left: -bleed,
      }}
      aria-hidden
    >
      {mounted &&
        Array.from({ length: count }, (_, i) => (
          <Sparkle key={i} sizeRange={sizeRange} />
        ))}
    </span>
  );
}
