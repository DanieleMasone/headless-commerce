import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { products } from "@/data/products";

const productImageRoot = join(process.cwd(), "public");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

describe("product catalog integrity", () => {
  it("uses unique, route-safe slugs", () => {
    const slugs = products.map((product) => product.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.every((slug) => slugPattern.test(slug))).toBe(true);
  });

  it("references existing public product images", () => {
    for (const product of products) {
      const imagePaths = [product.imagePath, ...product.gallery];

      for (const imagePath of imagePaths) {
        expect(existsSync(join(productImageRoot, imagePath.replace(/^\/+/, "")))).toBe(true);
      }
    }
  });

  it("contains production-quality product content", () => {
    for (const product of products) {
      expect(product.name).not.toMatch(/lorem|ipsum|placeholder/i);
      expect(product.description.length).toBeGreaterThan(80);
      expect(product.priceCents).toBeGreaterThan(0);
      expect(product.rating).toBeGreaterThanOrEqual(4);
      expect(product.reviewCount).toBeGreaterThan(0);
    }
  });
});
