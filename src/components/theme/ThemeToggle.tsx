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
      className="min-w-24"
      onClick={toggleTheme}
      size="sm"
      suppressHydrationWarning
      variant="secondary"
    >
      {isDark ? "Tema chiaro" : "Tema scuro"}
    </Button>
  );
}
