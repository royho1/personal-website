"use client";

type BasketballIconProps = {
  className?: string;
  strokeWidth?: number;
  /** Seconds to offset the bounce so paired balls stay out of phase. */
  animationDelay?: number;
  reducedMotion?: boolean;
};

/**
 * Shared NBA basketball icon. Bounce lives in CSS (`animate-basketball-bounce`);
 * delay is applied via inline style so both NBA cards can share one component.
 */
export default function BasketballIcon({
  className = "h-9 w-9",
  strokeWidth = 1.75,
  animationDelay = 0,
  reducedMotion = false,
}: BasketballIconProps) {
  return (
    <svg
      viewBox="0 -4 24 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} text-amber-600 dark:text-amber-400 ${
        reducedMotion ? "" : "animate-basketball-bounce"
      }`}
      style={
        reducedMotion || animationDelay === 0
          ? undefined
          : { animationDelay: `${animationDelay}s` }
      }
      aria-hidden
    >
      {/* Extra vertical viewBox padding so the bounce stays inside the SVG box. */}
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18" />
      <path d="M3 12h18" />
      <path d="M6.2 5.5c2.4 2.2 2.4 10.8 0 13" />
      <path d="M17.8 5.5c-2.4 2.2-2.4 10.8 0 13" />
    </svg>
  );
}
