import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { products } from "@/data/products";
import { CartProvider, useCart } from "@/lib/cart/cart-store";

const storageKey = "headless-commerce-cart";

function CartStoreHarness() {
  const { addItem, clearCart, closeCart, isOpen, itemCount, openCart, removeItem, subtotalCents } =
    useCart();

  return (
    <div>
      <span data-testid="count">{itemCount}</span>
      <span data-testid="subtotal">{subtotalCents}</span>
      <span data-testid="open">{String(isOpen)}</span>
      <button onClick={() => addItem(products[0])} type="button">
        add
      </button>
      <button onClick={() => removeItem(products[0].slug)} type="button">
        remove
      </button>
      <button onClick={clearCart} type="button">
        clear
      </button>
      <button onClick={openCart} type="button">
        open
      </button>
      <button onClick={closeCart} type="button">
        close
      </button>
    </div>
  );
}

describe("CartProvider", () => {
  it("restores current catalog data instead of trusting persisted product snapshots", async () => {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify([
        { product: { slug: products[0].slug, priceCents: 1 }, quantity: 2 },
        { product: { slug: products[0].slug }, quantity: 3 },
      ]),
    );

    render(
      <CartProvider>
        <CartStoreHarness />
      </CartProvider>,
    );

    await waitFor(() => expect(screen.getByTestId("count")).toHaveTextContent("2"));
    expect(screen.getByTestId("subtotal")).toHaveTextContent(String(products[0].priceCents * 2));
  });

  it.each([
    ["malformed JSON", "invalid json"],
    ["non-array data", JSON.stringify({ items: [] })],
    ["invalid records", JSON.stringify([null, { product: null, quantity: 1 }])],
    ["unknown products", JSON.stringify([{ product: { slug: "removed-product" }, quantity: 1 }])],
    ["negative quantities", JSON.stringify([{ product: products[0], quantity: -1 }])],
    ["fractional quantities", JSON.stringify([{ product: products[0], quantity: 1.5 }])],
    ["non-numeric quantities", JSON.stringify([{ product: products[0], quantity: "2" }])],
  ])("ignores %s in stored cart data", async (_label, storedCart) => {
    window.localStorage.setItem(storageKey, storedCart);

    render(
      <CartProvider>
        <CartStoreHarness />
      </CartProvider>,
    );

    expect(screen.getByTestId("count")).toHaveTextContent("0");
    fireEvent.click(screen.getByRole("button", { name: "add" }));
    await waitFor(() => expect(screen.getByTestId("subtotal")).toHaveTextContent("24900"));
  });

  it("keeps shopping available when browser storage is blocked", () => {
    const getItem = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("Storage blocked", "SecurityError");
    });
    const setItem = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Storage blocked", "SecurityError");
    });

    try {
      render(
        <CartProvider>
          <CartStoreHarness />
        </CartProvider>,
      );

      fireEvent.click(screen.getByRole("button", { name: "add" }));
      expect(screen.getByTestId("count")).toHaveTextContent("1");
      expect(screen.getByTestId("subtotal")).toHaveTextContent("24900");
    } finally {
      getItem.mockRestore();
      setItem.mockRestore();
    }
  });

  it("hydrates cart items from localStorage", async () => {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify([{ product: products[0], quantity: 2 }]),
    );

    render(
      <CartProvider>
        <CartStoreHarness />
      </CartProvider>,
    );

    expect(await screen.findByText("2")).toBeInTheDocument();
    expect(screen.getByTestId("subtotal")).toHaveTextContent(String(products[0].priceCents * 2));
  });

  it("exposes cart actions", () => {
    render(
      <CartProvider persist={false}>
        <CartStoreHarness />
      </CartProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "add" }));
    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(screen.getByTestId("open")).toHaveTextContent("true");

    fireEvent.click(screen.getByRole("button", { name: "close" }));
    expect(screen.getByTestId("open")).toHaveTextContent("false");

    fireEvent.click(screen.getByRole("button", { name: "open" }));
    expect(screen.getByTestId("open")).toHaveTextContent("true");

    fireEvent.click(screen.getByRole("button", { name: "remove" }));
    expect(screen.getByTestId("count")).toHaveTextContent("0");

    fireEvent.click(screen.getByRole("button", { name: "add" }));
    fireEvent.click(screen.getByRole("button", { name: "clear" }));
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("persists cart item changes to localStorage", async () => {
    render(
      <CartProvider>
        <CartStoreHarness />
      </CartProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "add" }));

    await waitFor(() => {
      expect(window.localStorage.getItem(storageKey)).toContain(products[0].slug);
    });
  });
});
