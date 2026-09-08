"use client";

/**
 * Shared source of truth for the Projects nav dropdown targets (individual
 * featured projects). Separate from the skill filter bus so the in-section
 * chips stay independent of the nav list.
 *
 * Mirrored to sessionStorage so a choice made on `/ask` still applies after
 * navigating to `/#project-…`, where ProjectsSection mounts fresh.
 */

export const PROJECT_NAV_ITEMS = [
  {
    id: "project-sf-restaurant-safety-map",
    label: "SF Restaurant Safety Map",
  },
  {
    id: "project-job-market-analytics-dashboard",
    label: "Job Market Analytics Dashboard",
  },
  {
    id: "project-drowsy-driver-detection",
    label: "Drowsy Driver Detection System",
  },
  { id: "projects", label: "All Projects" },
] as const;

/** Featured cards only; "All Projects" is listed separately below the divider. */
export const FEATURED_PROJECT_NAV_ITEMS = PROJECT_NAV_ITEMS.filter(
  (item) => item.id !== "projects",
);

export type ProjectNavId = (typeof PROJECT_NAV_ITEMS)[number]["id"];

/** Map featured card titles to the DOM ids used by the nav. */
export const FEATURED_PROJECT_DOM_IDS = {
  "SF Restaurant Safety Map": "project-sf-restaurant-safety-map",
  "Job Market Analytics Dashboard": "project-job-market-analytics-dashboard",
  "Drowsy Driver Detection": "project-drowsy-driver-detection",
} as const;

const EVENT_NAME = "projects:focus-change";
const STORAGE_KEY = "projects:focus";

type FocusEventDetail = { focusId: ProjectNavId | null };

/** null = no dropdown row selected (fresh visit / Projects label click). */
let currentFocus: ProjectNavId | null = null;

function isProjectNavId(value: string | null): value is ProjectNavId {
  return (
    value != null &&
    PROJECT_NAV_ITEMS.some((item) => item.id === value)
  );
}

export { isProjectNavId };

export function getProjectsFocus(): ProjectNavId | null {
  if (typeof window !== "undefined") {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored === "") {
        currentFocus = null;
        return null;
      }
      if (isProjectNavId(stored)) {
        currentFocus = stored;
        return stored;
      }
    } catch {
      // Private mode / blocked storage — keep in-memory value.
    }
  }
  return currentFocus;
}

export function emitProjectsFocus(focusId: ProjectNavId | null): void {
  currentFocus = focusId;
  if (typeof window === "undefined") return;
  try {
    if (focusId == null) {
      sessionStorage.removeItem(STORAGE_KEY);
    } else {
      sessionStorage.setItem(STORAGE_KEY, focusId);
    }
  } catch {
    // Ignore quota / privacy errors; in-memory + event still work.
  }
  window.dispatchEvent(
    new CustomEvent<FocusEventDetail>(EVENT_NAME, {
      detail: { focusId },
    }),
  );
}

export function subscribeToProjectsFocus(
  handler: (focusId: ProjectNavId | null) => void,
): () => void {
  if (typeof window === "undefined") return () => {};
  const listener = (event: Event) => {
    const detail = (event as CustomEvent<FocusEventDetail>).detail;
    if (detail && "focusId" in detail) handler(detail.focusId);
  };
  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}

/** Scroll to a projects nav target once the matching node is in the DOM. */
export function scrollToProjectsFocus(focusId: ProjectNavId): void {
  if (typeof document === "undefined") return;

  const attempt = (remaining: number) => {
    const el = document.getElementById(focusId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      // Focus after the scroll starts so sticky-nav layout has settled.
      window.setTimeout(() => {
        if (typeof el.focus === "function") {
          el.focus({ preventScroll: true });
        }
      }, 120);
      return;
    }
    if (remaining > 0) {
      requestAnimationFrame(() => attempt(remaining - 1));
    }
  };

  attempt(20);
}
