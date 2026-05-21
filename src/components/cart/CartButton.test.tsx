import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CartButton } from "@/components/cart/CartButton";
import { products } from "@/data/products";
import { CartProvider } from "@/lib/cart/cart-store";

describe("CartButton", () => {
  it("shows the current item count", () => {
    render(
      <CartProvider
        initialState={{
          isOpen: false,
          items: [{ product: products[0], quantity: 2 }],
        }}
        persist={false}
      >
        <CartButton />
      </CartProvider>,
    );

    expect(screen.getByTestId("cart-count")).toHaveTextContent("2");
    expect(
      screen.getByRole("button", { name: /Apri carrello, 2 articoli, totale/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("button")).toHaveAttribute("aria-controls", "cart-drawer");
  });
});
