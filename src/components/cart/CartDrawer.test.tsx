import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { products } from "@/data/products";
import { CartProvider } from "@/lib/cart/cart-store";

describe("CartDrawer", () => {
  it("renders line items, subtotal, and quantity controls", () => {
    render(
      <CartProvider
        initialState={{
          isOpen: true,
          items: [{ product: products[0], quantity: 1 }],
        }}
        persist={false}
      >
        <CartDrawer />
      </CartProvider>,
    );

    expect(screen.getByRole("dialog", { name: "Carrello (1)" })).toBeInTheDocument();
    expect(screen.getByText(products[0].name)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: `Aumenta quantità ${products[0].name}` }));

    expect(screen.getByRole("dialog", { name: "Carrello (2)" })).toBeInTheDocument();
  });

  it("closes with the Escape key", () => {
    render(
      <CartProvider initialState={{ isOpen: true, items: [] }} persist={false}>
        <CartDrawer />
      </CartProvider>,
    );

    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows the empty state and close action", () => {
    render(
      <CartProvider initialState={{ isOpen: true, items: [] }} persist={false}>
        <CartDrawer />
      </CartProvider>,
    );

    expect(screen.getByText("Il carrello è vuoto")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Continua lo shopping" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
