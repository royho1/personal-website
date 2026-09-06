"use client";

import type { CSSProperties } from "react";
import { useId } from "react";
import { useReducedMotion } from "framer-motion";
import BasketballIcon from "./BasketballIcon";

export type AdditionalProjectIconVariant =
  | "sparkles"
  | "heart"
  | "wine"
  | "trending"
  | "basketball"
  | "clapperboard"
  | "network"
  | "scale";

type IconProps = {
  className?: string;
  strokeWidth?: number;
  reducedMotion?: boolean;
  animationDelay?: number;
};

const svgBase = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function SparklesIcon({
  className,
  strokeWidth = 1.75,
  reducedMotion,
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      {...svgBase}
      strokeWidth={strokeWidth}
      className={`${className} text-violet-500 dark:text-violet-400`}
      aria-hidden
    >
      <path
        className={
          reducedMotion
            ? "origin-center [transform-box:fill-box]"
            : "origin-center [transform-box:fill-box] animate-sparkle-twinkle-1"
        }
        d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
      />
      <g
        className={
          reducedMotion
            ? "origin-center [transform-box:fill-box]"
            : "origin-center [transform-box:fill-box] animate-sparkle-twinkle-2"
        }
      >
        <path d="M20 2v4" />
        <path d="M22 4h-4" />
      </g>
      <circle
        className={
          reducedMotion
            ? "origin-center [transform-box:fill-box]"
            : "origin-center [transform-box:fill-box] animate-sparkle-twinkle-3"
        }
        cx="4"
        cy="20"
        r="2"
      />
    </svg>
  );
}

function HeartPulseIcon({
  className,
  strokeWidth = 1.75,
  reducedMotion,
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      {...svgBase}
      strokeWidth={strokeWidth}
      className={`${className} origin-center text-rose-600 dark:text-rose-400 ${
        reducedMotion ? "" : "animate-addl-heartbeat"
      }`}
      aria-hidden
    >
      <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
      <path
        className={reducedMotion ? undefined : "animate-ecg-trace"}
        pathLength={1}
        strokeDasharray={reducedMotion ? undefined : "1"}
        strokeDashoffset={reducedMotion ? undefined : 1}
        d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"
      />
    </svg>
  );
}

function WineIcon({
  className,
  strokeWidth = 1.75,
  reducedMotion,
  animationDelay = 0,
}: IconProps) {
  const clipId = useId().replace(/:/g, "");
  const delayStyle: CSSProperties | undefined =
    reducedMotion || animationDelay === 0
      ? undefined
      : { ["--icon-delay" as string]: `${animationDelay}s` };

  // Glass below the bottle; rim ~y=22, lip ~y=7.7.
  const bowlPath =
    "M17.45 34.95a5 5 0 0 0 5-5c0-2-.5-4-2-8H14.45c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z";

  // Larger bottle upper-left, pre-rotated ~55deg around (7, 15).
  const bottlePath =
    "M17.62 6.38 18.73 7.97 18.08 8.58 12.69 12.09 12.46 14.83 8.72 17.45 5.28 12.55 9.03 9.92 11.69 10.64 16.82 6.78Z";

  return (
    <svg
      viewBox="4 5 20 38"
      {...svgBase}
      strokeWidth={strokeWidth}
      className={`${className} text-purple-600 dark:text-purple-400`}
      style={delayStyle}
      aria-hidden
    >
      <defs>
        <clipPath id={clipId}>
          <path d={bowlPath} />
        </clipPath>
      </defs>

      <g
        className={reducedMotion ? undefined : "animate-wine-bottle"}
        style={{ transformBox: "view-box", transformOrigin: "7px 15px" }}
      >
        <path d={bottlePath} />
        <path d="M17.62 6.38 18.73 7.97" />
      </g>

      {!reducedMotion && (
        <path
          className="animate-wine-stream"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={1}
          d="M17.5 7.7C17.2 13 17.1 20 17.5 28"
        />
      )}

      <g clipPath={`url(#${clipId})`}>
        <rect
          x="13"
          y="22"
          width="9.5"
          height="13"
          fill="currentColor"
          stroke="none"
          className={reducedMotion ? "wine-fill-rest" : "animate-wine-fill"}
        />
      </g>

      <path d="M13.45 41.95h8" />
      <path d="M17.45 34.95v7" />
      <path d={bowlPath} />
    </svg>
  );
}

function TrendingUpIcon({
  className,
  strokeWidth = 1.75,
  reducedMotion,
  animationDelay = 0,
}: IconProps) {
  const delayStyle: CSSProperties | undefined =
    reducedMotion || animationDelay === 0
      ? undefined
      : { ["--icon-delay" as string]: `${animationDelay}s` };

  return (
    <svg
      viewBox="0 0 24 24"
      {...svgBase}
      strokeWidth={strokeWidth}
      className={`${className} text-emerald-600 dark:text-emerald-400`}
      style={delayStyle}
      aria-hidden
    >
      <path
        className={
          reducedMotion
            ? undefined
            : "origin-[22px_7px] animate-trend-arrow [transform-box:view-box]"
        }
        d="M16 7h6v6"
      />
      <path
        className={reducedMotion ? undefined : "animate-trend-line"}
        pathLength={1}
        strokeDasharray={reducedMotion ? undefined : "1"}
        strokeDashoffset={reducedMotion ? undefined : 1}
        d="m22 7-8.5 8.5-5-5L2 17"
      />
    </svg>
  );
}

function ClapperboardIcon({
  className,
  strokeWidth = 1.75,
  reducedMotion,
}: IconProps) {
  return (
    <svg
      viewBox="-2 -4 28 30"
      {...svgBase}
      strokeWidth={strokeWidth}
      className={`${className} text-slate-600 dark:text-slate-300`}
      aria-hidden
    >
      <g
        className={reducedMotion ? undefined : "animate-clapper-snap"}
        style={{ transformBox: "view-box", transformOrigin: "3px 11px" }}
      >
        <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z" />
        <path d="m12.296 3.464 3.02 3.956" />
        <path d="m6.18 5.276 3.1 3.899" />
      </g>
      <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

function ScaleIcon({ className, strokeWidth = 1.75, reducedMotion }: IconProps) {
  return (
    <svg
      viewBox="-3 -2 30 28"
      {...svgBase}
      strokeWidth={strokeWidth}
      className={`${className} text-stone-600 dark:text-stone-300`}
      aria-hidden
    >
      <path d="M12 3v18" />
      <path d="M7 21h10" />
      <g
        className={reducedMotion ? undefined : "animate-scale-beam"}
        style={{ transformBox: "view-box", transformOrigin: "12px 7px" }}
      >
        <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1" />
        <g
          className={reducedMotion ? undefined : "animate-scale-pan-left"}
          style={{ transformBox: "view-box", transformOrigin: "5px 7px" }}
        >
          <path d="m5 8 3 8a5 5 0 0 1-6 0zV7" />
        </g>
        <g
          className={reducedMotion ? undefined : "animate-scale-pan-right"}
          style={{ transformBox: "view-box", transformOrigin: "19px 7px" }}
        >
          <path d="m19 8 3 8a5 5 0 0 1-6 0zV7" />
        </g>
      </g>
    </svg>
  );
}

function NetworkIcon({
  className,
  strokeWidth = 1.75,
  reducedMotion,
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      {...svgBase}
      strokeWidth={strokeWidth}
      className={`${className} text-cyan-600 dark:text-cyan-400`}
      aria-hidden
    >
      <path
        className={reducedMotion ? undefined : "animate-network-edge-1"}
        pathLength={1}
        strokeDasharray={reducedMotion ? undefined : "1"}
        strokeDashoffset={reducedMotion ? undefined : 1}
        d="M12 12V8"
      />
      <path
        className={reducedMotion ? undefined : "animate-network-edge-2"}
        pathLength={1}
        strokeDasharray={reducedMotion ? undefined : "1"}
        strokeDashoffset={reducedMotion ? undefined : 1}
        d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"
      />
      <rect
        className={
          reducedMotion
            ? "origin-center [transform-box:fill-box]"
            : "origin-center [transform-box:fill-box] animate-network-node-1"
        }
        x="9"
        y="2"
        width="6"
        height="6"
        rx="1"
      />
      <rect
        className={
          reducedMotion
            ? "origin-center [transform-box:fill-box]"
            : "origin-center [transform-box:fill-box] animate-network-node-2"
        }
        x="2"
        y="16"
        width="6"
        height="6"
        rx="1"
      />
      <rect
        className={
          reducedMotion
            ? "origin-center [transform-box:fill-box]"
            : "origin-center [transform-box:fill-box] animate-network-node-3"
        }
        x="16"
        y="16"
        width="6"
        height="6"
        rx="1"
      />
    </svg>
  );
}

export function AdditionalProjectIcon({
  variant,
  size = "sm",
  animationDelay,
}: {
  variant: AdditionalProjectIconVariant;
  size?: "sm" | "lg";
  animationDelay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const iconClass = size === "lg" ? "h-14 w-14" : "h-9 w-9";
  const stroke = 1.75;
  // Only treat an explicit `true` as reduced-motion (null = still hydrating).
  const reduced = prefersReducedMotion === true;

  switch (variant) {
    case "sparkles":
      return (
        <SparklesIcon
          className={iconClass}
          strokeWidth={stroke}
          reducedMotion={reduced}
        />
      );
    case "heart":
      return (
        <HeartPulseIcon
          className={iconClass}
          strokeWidth={stroke}
          reducedMotion={reduced}
        />
      );
    case "wine":
      return (
        <WineIcon
          className={iconClass}
          strokeWidth={stroke}
          reducedMotion={reduced}
          animationDelay={animationDelay}
        />
      );
    case "trending":
      return (
        <TrendingUpIcon
          className={iconClass}
          strokeWidth={stroke}
          reducedMotion={reduced}
          animationDelay={animationDelay}
        />
      );
    case "basketball":
      return (
        <BasketballIcon
          className={iconClass}
          strokeWidth={stroke}
          reducedMotion={reduced}
          animationDelay={animationDelay}
        />
      );
    case "clapperboard":
      return (
        <ClapperboardIcon
          className={iconClass}
          strokeWidth={stroke}
          reducedMotion={reduced}
        />
      );
    case "network":
      return (
        <NetworkIcon
          className={iconClass}
          strokeWidth={stroke}
          reducedMotion={reduced}
        />
      );
    case "scale":
      return (
        <ScaleIcon
          className={iconClass}
          strokeWidth={stroke}
          reducedMotion={reduced}
        />
      );
    default:
      return null;
  }
}
