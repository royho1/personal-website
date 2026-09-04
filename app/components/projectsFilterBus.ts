"use client";

/**
 * Shared source of truth for the Projects section's filter options. The
 * ProjectsSection owns the actual filter state; the NavBar dropdown sets
 * it by dispatching a custom event on `window`. Using a simple event bus
 * (instead of a React context) keeps NavBar and ProjectsSection decoupled
 * without threading a provider through the layout.
 *
 * The last chosen filter is also mirrored to sessionStorage so a selection
 * made on `/ask` (or any page) still applies after navigating to `/#projects`,
 * where ProjectsSection mounts fresh and would otherwise miss the event.
 */
export const FILTERS = [
  "All",
  "Python",
  "SQL",
  "R",
  "Machine Learning",
  "NLP",
  "Data Visualization",
] as const;

export type Filter = (typeof FILTERS)[number];
export type Tag = Exclude<Filter, "All">;

const EVENT_NAME = "projects:filter-change";
const STORAGE_KEY = "projects:filter";

type FilterEventDetail = { filter: Filter };

let currentFilter: Filter = "All";

function isFilter(value: string | null): value is Filter {
  return value != null && (FILTERS as readonly string[]).includes(value);
}

/** Last filter known in this JS realm, falling back to sessionStorage. */
export function getProjectsFilter(): Filter {
  if (typeof window !== "undefined") {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (isFilter(stored)) {
        currentFilter = stored;
        return stored;
      }
    } catch {
      // Private mode / blocked storage — keep in-memory value.
    }
  }
  return currentFilter;
}

/** Broadcast a filter choice so any listeners (e.g. the ProjectsSection)
 * can apply it. Safe to call during render-time event handlers. */
export function emitProjectsFilter(filter: Filter): void {
  currentFilter = filter;
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, filter);
  } catch {
    // Ignore quota / privacy errors; in-memory + event still work.
  }
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
