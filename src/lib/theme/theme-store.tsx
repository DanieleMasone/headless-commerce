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

export type ThemeMode = "dark" | "light";

const storageKey = "headless-commerce-theme";

/**
 * Public theme context used by interactive controls.
 */
export interface ThemeContextValue {
  readonly isDark: boolean;
  readonly setTheme: (theme: ThemeMode) => void;
  readonly theme: ThemeMode;
  readonly toggleTheme: () => void;
}

/**
 * Theme provider options for production shell and component tests.
 */
export interface ThemeProviderProps {
  readonly children: ReactNode;
  readonly defaultTheme?: ThemeMode;
  readonly persist?: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getStoredTheme(): ThemeMode | null {
  const value = window.localStorage.getItem(storageKey);

  return value === "dark" || value === "light" ? value : null;
}

function getPreferredTheme(): ThemeMode {
  const storedTheme = getStoredTheme();

  if (storedTheme) {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: ThemeMode): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

/**
 * Client-only theme provider with localStorage persistence and system preference fallback.
 */
export function ThemeProvider({
  children,
  defaultTheme,
  persist = true,
}: ThemeProviderProps): ReactNode {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") {
      return defaultTheme ?? "light";
    }

    return defaultTheme ?? getPreferredTheme();
  });

  useEffect(() => {
    applyTheme(theme);

    if (persist) {
      window.localStorage.setItem(storageKey, theme);
    }
  }, [persist, theme]);

  const setTheme = useCallback((nextTheme: ThemeMode) => {
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      isDark: theme === "dark",
      setTheme,
      theme,
      toggleTheme,
    }),
    [setTheme, theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider.");
  }

  return context;
}
