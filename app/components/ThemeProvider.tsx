"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Fallback for browsers without view transitions: per-element color fades. */
const THEME_TRANSITION_CLASS = "theme-transition";
const THEME_TRANSITION_MS = 600;

/** Freezes per-element transitions so the view-transition crossfade is the
 * only animation; otherwise each element's own `transition-colors` would
 * re-animate inside the new snapshot on its own timing. */
const THEME_SWITCHING_CLASS = "theme-switching";

/**
 * Provides the current theme and a toggle function. State is kept in memory
 * only (no localStorage) and defaults to `light` on each page load. The
 * `dark` class is mirrored onto <html> so Tailwind's `dark:` variants apply.
 *
 * Switching uses the View Transitions API when available so the whole page,
 * including gradients, images, and SVG strokes that CSS cannot interpolate,
 * crossfades as one layer.
 */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const themeRef = useRef<Theme>(theme);

  useEffect(() => {
    themeRef.current = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    if (next === themeRef.current) return;
    const root = document.documentElement;

    const apply = () => {
      themeRef.current = next;
      flushSync(() => setThemeState(next));
      root.classList.toggle("dark", next === "dark");
    };

    if (typeof document.startViewTransition !== "function") {
      root.classList.add(THEME_TRANSITION_CLASS);
      apply();
      window.setTimeout(
        () => root.classList.remove(THEME_TRANSITION_CLASS),
        THEME_TRANSITION_MS,
      );
      return;
    }

    root.classList.add(THEME_SWITCHING_CLASS);
    const transition = document.startViewTransition(apply);
    transition.finished.finally(() =>
      root.classList.remove(THEME_SWITCHING_CLASS),
    );
  }, []);

  const toggle = useCallback(
    () => setTheme(themeRef.current === "dark" ? "light" : "dark"),
    [setTheme],
  );

  const value = useMemo(
    () => ({ theme, toggle, setTheme }),
    [theme, toggle, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
