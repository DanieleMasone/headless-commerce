import { describe, expect, it } from "vitest";

import { cx, formatPrice } from "@/lib/format";

describe("formatPrice", () => {
  it("formats cent amounts in EUR", () => {
    expect(formatPrice(24900)).toBe("249,00 €");
  });

  it("rejects non-finite values", () => {
    expect(() => formatPrice(Number.NaN)).toThrow(TypeError);
  });
});

describe("cx", () => {
  it("joins truthy class names", () => {
    expect(cx("a", false, undefined, "b")).toBe("a b");
  });
});
