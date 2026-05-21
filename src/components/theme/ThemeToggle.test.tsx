import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ThemeProvider } from "@/lib/theme/theme-store";

function renderThemeToggle(): void {
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe("ThemeToggle", () => {
  it("toggles dark mode and persists the choice", async () => {
    renderThemeToggle();

    const toggle = await screen.findByRole("button", { name: "Attiva tema scuro" });
    fireEvent.click(toggle);

    expect(document.documentElement).toHaveClass("dark");
    expect(window.localStorage.getItem("headless-commerce-theme")).toBe("dark");
    expect(toggle).toHaveAccessibleName("Attiva tema chiaro");
  });

  it("uses prefers-color-scheme when no stored preference exists", async () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      addEventListener: vi.fn(),
      addListener: vi.fn(),
      dispatchEvent: vi.fn(),
      matches: query === "(prefers-color-scheme: dark)",
      media: query,
      onchange: null,
      removeEventListener: vi.fn(),
      removeListener: vi.fn(),
    }));

    renderThemeToggle();

    await waitFor(() => expect(document.documentElement).toHaveClass("dark"));
    expect(screen.getByRole("button", { name: "Attiva tema chiaro" })).toBeInTheDocument();
  });
});
