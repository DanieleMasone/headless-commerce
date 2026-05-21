import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

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
});
