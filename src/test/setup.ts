import "@testing-library/jest-dom/vitest";

import { afterEach, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    value: vi.fn().mockImplementation((query: string) => ({
      addEventListener: vi.fn(),
      addListener: vi.fn(),
      dispatchEvent: vi.fn(),
      matches: false,
      media: query,
      onchange: null,
      removeEventListener: vi.fn(),
      removeListener: vi.fn(),
    })),
    writable: true,
  });
});

afterEach(() => {
  cleanup();
  document.documentElement.classList.remove("dark");
  document.documentElement.style.colorScheme = "";
  window.localStorage.clear();
});
