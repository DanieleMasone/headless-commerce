import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { productCategories } from "@/data/products";
import { ProductFilters } from "@/components/product/ProductFilters";
import type { ProductFilterState } from "@/lib/products/filter-products";

const filters: ProductFilterState = {
  category: "all",
  maxPriceCents: 32900,
  sort: "featured",
};

describe("ProductFilters", () => {
  it("emits category filter changes", () => {
    const onChange = vi.fn();
    render(
      <ProductFilters
        categories={productCategories}
        filters={filters}
        maxPriceCents={32900}
        onChange={onChange}
        resultCount={8}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Audio" }));

    expect(onChange).toHaveBeenCalledWith({ ...filters, category: "Audio" });
  });

  it("emits sort changes", () => {
    const onChange = vi.fn();
    render(
      <ProductFilters
        categories={productCategories}
        filters={filters}
        maxPriceCents={32900}
        onChange={onChange}
        resultCount={8}
      />,
    );

    fireEvent.change(screen.getByLabelText("Ordinamento"), { target: { value: "price-asc" } });

    expect(onChange).toHaveBeenCalledWith({ ...filters, sort: "price-asc" });
  });

  it("emits price changes", () => {
    const onChange = vi.fn();
    render(
      <ProductFilters
        categories={productCategories}
        filters={filters}
        maxPriceCents={32900}
        onChange={onChange}
        resultCount={8}
      />,
    );

    fireEvent.change(screen.getByLabelText("Prezzo massimo"), { target: { value: "20000" } });

    expect(onChange).toHaveBeenCalledWith({ ...filters, maxPriceCents: 20000 });
  });
});
