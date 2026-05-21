import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";

describe("ProductCard", () => {
  it("renders product content and links to the detail page", () => {
    render(<ProductCard onAddToCart={vi.fn()} product={products[0]} />);

    expect(screen.getByRole("heading", { name: products[0].name })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: `Apri ${products[0].name}` })).toHaveAttribute(
      "href",
      `/product/${products[0].slug}`,
    );
  });

  it("calls add to cart from the card CTA", () => {
    const onAddToCart = vi.fn();
    render(<ProductCard onAddToCart={onAddToCart} product={products[0]} />);

    fireEvent.click(screen.getByRole("button", { name: "Aggiungi" }));

    expect(onAddToCart).toHaveBeenCalledWith(products[0]);
  });
});
