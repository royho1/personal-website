"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_TRANSITION_CLASS = "theme-transition";

/**
 * Provides the current theme and a toggle function. State is kept in memory
 * only (no localStorage) and defaults to `light` on each page load. The
 * `dark` class is mirrored onto <html> so Tailwind's `dark:` variants apply.
 */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const root = document.documentElement;
    // Briefly enable the site-wide transition class so color changes ease
    // between themes instead of snapping, then remove it so it doesn't
    // interfere with per-element transitions on regular hover states.
    root.classList.add(THEME_TRANSITION_CLASS);
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    const id = window.setTimeout(() => {
      root.classList.remove(THEME_TRANSITION_CLASS);
    }, 600);
    return () => window.clearTimeout(id);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const toggle = useCallback(
    () => setThemeState((t) => (t === "dark" ? "light" : "dark")),
    [],
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
