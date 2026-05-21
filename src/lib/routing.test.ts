import { afterEach, describe, expect, it } from "vitest";

import { getBasePath, withBasePath } from "@/lib/routing";

const originalBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

afterEach(() => {
  process.env.NEXT_PUBLIC_BASE_PATH = originalBasePath;
});

describe("routing helpers", () => {
  it("returns empty base path by default", () => {
    process.env.NEXT_PUBLIC_BASE_PATH = "";

    expect(getBasePath()).toBe("");
    expect(withBasePath("/products/example.png")).toBe("/products/example.png");
  });

  it("normalizes project pages base paths", () => {
    process.env.NEXT_PUBLIC_BASE_PATH = "headless-commerce/";

    expect(getBasePath()).toBe("/headless-commerce");
    expect(withBasePath("products/example.png")).toBe("/headless-commerce/products/example.png");
  });
});
