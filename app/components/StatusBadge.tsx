import type { ReactNode } from "react";

type StatusBadgeProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Green status pill with a live pulse dot — shared by the hero
 * "Available for opportunities" badge and project status badges.
 */
export default function StatusBadge({
  children,
  className = "",
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-[13px] font-medium leading-none text-emerald-700 shadow-sm shadow-emerald-900/10 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300 dark:shadow-emerald-950/40 ${className}`}
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
      {children}
    </span>
  );
}
