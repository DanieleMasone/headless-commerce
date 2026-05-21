"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type ThemeMode = "dark" | "light";

const storageKey = "headless-commerce-theme";
const listeners = new Set<() => void>();
let fallbackTheme: ThemeMode | null = null;

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
 * Theme provider options for the production shell.
 */
export interface ThemeProviderProps {
  readonly children: ReactNode;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function canUseDom(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function getStoredTheme(): ThemeMode | null {
  try {
    const value = window.localStorage.getItem(storageKey);

    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
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

function emitThemeChange(): void {
  listeners.forEach((listener) => listener());
}

function getClientThemeSnapshot(): ThemeMode {
  if (!canUseDom()) {
    return "light";
  }

  return getStoredTheme() ?? fallbackTheme ?? getPreferredTheme();
}

function getServerThemeSnapshot(): ThemeMode {
  return "light";
}

function subscribeToTheme(listener: () => void): () => void {
  listeners.add(listener);

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemThemeChange = (event: MediaQueryListEvent): void => {
    if (getStoredTheme()) {
      return;
    }

    const nextTheme: ThemeMode = event.matches ? "dark" : "light";
    applyTheme(nextTheme);
    emitThemeChange();
  };
  const handleStorageChange = (event: StorageEvent): void => {
    if (event.key !== storageKey) {
      return;
    }

    fallbackTheme = null;
    applyTheme(getPreferredTheme());
    emitThemeChange();
  };

  mediaQuery.addEventListener("change", handleSystemThemeChange);
  window.addEventListener("storage", handleStorageChange);

  return () => {
    listeners.delete(listener);
    mediaQuery.removeEventListener("change", handleSystemThemeChange);
    window.removeEventListener("storage", handleStorageChange);
  };
}

/**
 * Client-only theme provider with localStorage persistence and system preference fallback.
 */
export function ThemeProvider({ children }: ThemeProviderProps): ReactNode {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getClientThemeSnapshot,
    getServerThemeSnapshot,
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((nextTheme: ThemeMode) => {
    fallbackTheme = nextTheme;
    applyTheme(nextTheme);

    try {
      window.localStorage.setItem(storageKey, nextTheme);
      fallbackTheme = null;
    } catch {
      // Ignore storage failures; the visual theme still updates for the current session.
    }

    emitThemeChange();
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
