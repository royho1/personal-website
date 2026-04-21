"use client";

/**
 * Shared source of truth for the Projects section's filter options. The
 * ProjectsSection owns the actual filter state; the NavBar dropdown sets
 * it by dispatching a custom event on `window`. Using a simple event bus
 * (instead of a React context) keeps NavBar and ProjectsSection decoupled
 * without threading a provider through the layout.
 */
export const FILTERS = [
  "All",
  "Python",
  "R",
  "Machine Learning",
  "NLP",
  "Data Visualization",
] as const;

export type Filter = (typeof FILTERS)[number];
export type Tag = Exclude<Filter, "All">;

const EVENT_NAME = "projects:filter-change";

type FilterEventDetail = { filter: Filter };

/** Broadcast a filter choice so any listeners (e.g. the ProjectsSection)
 * can apply it. Safe to call during render-time event handlers. */
export function emitProjectsFilter(filter: Filter): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<FilterEventDetail>(EVENT_NAME, {
      detail: { filter },
    }),
  );
}

/** Subscribe to filter change events. Returns an unsubscribe function
 * suitable for use inside a `useEffect` cleanup. */
export function subscribeToProjectsFilter(
  handler: (filter: Filter) => void,
): () => void {
  if (typeof window === "undefined") return () => {};
  const listener = (event: Event) => {
    const detail = (event as CustomEvent<FilterEventDetail>).detail;
    if (detail?.filter) handler(detail.filter);
  };
  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}
