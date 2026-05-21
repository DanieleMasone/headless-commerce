import { describe, expect, it } from "vitest";

import { products } from "@/data/products";
import { createMockStripeCheckoutSession } from "@/lib/checkout/stripe-mock";

describe("createMockStripeCheckoutSession", () => {
  it("creates a successful browser-only checkout session", async () => {
    const session = await createMockStripeCheckoutSession({
      items: [{ product: products[0], quantity: 1 }],
      latencyMs: 0,
      subtotalCents: products[0].priceCents,
    });

    expect(session.status).toBe("success");
    expect(session.sessionId).toMatch(/^cs_mock_/);
    expect(session.checkoutUrl).toContain("mock=stripe");
  });

  it("fails when the cart is empty", async () => {
    const session = await createMockStripeCheckoutSession({
      items: [],
      latencyMs: 0,
      subtotalCents: 0,
    });

    expect(session.status).toBe("failure");
  });
});
