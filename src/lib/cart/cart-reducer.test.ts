import { describe, expect, it } from "vitest";

import { products } from "@/data/products";
import {
  cartReducer,
  getCartItemCount,
  getCartSubtotal,
  initialCartState,
} from "@/lib/cart/cart-reducer";

const firstProduct = products[0];

describe("cartReducer", () => {
  it("adds a product and opens the drawer", () => {
    const state = cartReducer(initialCartState, { product: firstProduct, type: "add" });

    expect(state.isOpen).toBe(true);
    expect(state.items).toHaveLength(1);
    expect(state.items[0]?.quantity).toBe(1);
  });

  it("increments existing products instead of duplicating lines", () => {
    const withOne = cartReducer(initialCartState, {
      product: firstProduct,
      quantity: 2,
      type: "add",
    });
    const state = cartReducer(withOne, { product: firstProduct, type: "add" });

    expect(state.items).toHaveLength(1);
    expect(state.items[0]?.quantity).toBe(3);
  });

  it("decrements and removes zero-quantity lines", () => {
    const withOne = cartReducer(initialCartState, { product: firstProduct, type: "add" });
    const state = cartReducer(withOne, { slug: firstProduct.slug, type: "decrement" });

    expect(state.items).toHaveLength(0);
  });

  it("handles missing line item actions without mutation", () => {
    const incremented = cartReducer(initialCartState, { slug: "missing", type: "increment" });
    const decremented = cartReducer(initialCartState, { slug: "missing", type: "decrement" });

    expect(incremented).toBe(initialCartState);
    expect(decremented).toBe(initialCartState);
  });

  it("hydrates, removes, clears, opens, and closes", () => {
    const hydrated = cartReducer(initialCartState, {
      items: [{ product: firstProduct, quantity: 2 }],
      type: "hydrate",
    });
    const opened = cartReducer(hydrated, { type: "open" });
    const closed = cartReducer(opened, { type: "close" });
    const removed = cartReducer(closed, { slug: firstProduct.slug, type: "remove" });
    const cleared = cartReducer(hydrated, { type: "clear" });

    expect(hydrated.items).toHaveLength(1);
    expect(opened.isOpen).toBe(true);
    expect(closed.isOpen).toBe(false);
    expect(removed.items).toHaveLength(0);
    expect(cleared.items).toHaveLength(0);
  });

  it("normalizes invalid add quantities", () => {
    const state = cartReducer(initialCartState, {
      product: firstProduct,
      quantity: Number.NaN,
      type: "add",
    });

    expect(state.items[0]?.quantity).toBe(1);
  });

  it("calculates count and subtotal", () => {
    const state = cartReducer(initialCartState, {
      product: firstProduct,
      quantity: 3,
      type: "add",
    });

    expect(getCartItemCount(state.items)).toBe(3);
    expect(getCartSubtotal(state.items)).toBe(firstProduct.priceCents * 3);
  });
});
