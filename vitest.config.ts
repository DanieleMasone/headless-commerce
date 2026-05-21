import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

const projectRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(projectRoot, "src"),
    },
  },
  test: {
    environment: "jsdom",
    exclude: ["**/node_modules/**", "**/.next/**", "**/out/**", "e2e/**"],
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      reportsDirectory: "coverage",
      include: [
        "src/components/cart/CartButton.tsx",
        "src/components/cart/CartDrawer.tsx",
        "src/components/product/ProductCard.tsx",
        "src/components/product/ProductFilters.tsx",
        "src/components/theme/ThemeToggle.tsx",
        "src/lib/cart/cart-reducer.ts",
        "src/lib/cart/cart-store.tsx",
        "src/lib/checkout/stripe-mock.ts",
        "src/lib/format.ts",
        "src/lib/products/filter-products.ts",
        "src/lib/routing.ts",
        "src/lib/theme/theme-store.tsx",
      ],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/components/layout/**",
        "src/components/checkout/**",
        "src/components/product/ProductCatalog.tsx",
        "src/components/product/ProductGrid.tsx",
      ],
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },
    },
  },
});
