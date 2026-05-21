"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { useTheme } from "@/lib/theme/theme-store";

/**
 * Persistent dark-mode control exposed in the application header.
 */
export function ThemeToggle(): ReactNode {
  const { isDark, toggleTheme } = useTheme();
  const label = isDark ? "Attiva tema chiaro" : "Attiva tema scuro";

  return (
    <Button
      aria-label={label}
      aria-pressed={isDark}
      className="min-w-14 sm:min-w-24"
      onClick={toggleTheme}
      size="sm"
      variant="secondary"
    >
      <span className="sm:hidden">Tema</span>
      <span className="hidden sm:inline">
        <span className="hidden dark:inline">Tema chiaro</span>
        <span className="dark:hidden">Tema scuro</span>
      </span>
    </Button>
  );
}
