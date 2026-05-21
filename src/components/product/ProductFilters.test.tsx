import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ProductFilters } from "@/components/product/ProductFilters";
import { productCategories } from "@/data/products";
import type { ProductFilterState } from "@/lib/products/filter-products";

const filters: ProductFilterState = {
  category: "all",
  maxPriceCents: 32900,
  query: "",
  sort: "featured",
};

function renderProductFilters({
  currentFilters = filters,
  onChange = vi.fn(),
  onReset = vi.fn(),
}: {
  readonly currentFilters?: ProductFilterState;
  readonly onChange?: (filters: ProductFilterState) => void;
  readonly onReset?: () => void;
} = {}) {
  render(
    <ProductFilters
      categories={productCategories}
      filters={currentFilters}
      maxPriceCents={32900}
      onChange={onChange}
      onReset={onReset}
      resultCount={8}
      totalCount={8}
    />,
  );

  return { onChange, onReset };
}

describe("ProductFilters", () => {
  it("emits category filter changes", () => {
    const { onChange } = renderProductFilters();

    fireEvent.click(screen.getByRole("button", { name: "Audio" }));

    expect(onChange).toHaveBeenCalledWith({ ...filters, category: "Audio" });
  });

  it("emits sort changes", () => {
    const { onChange } = renderProductFilters();

    fireEvent.change(screen.getByLabelText("Ordinamento"), { target: { value: "price-asc" } });

    expect(onChange).toHaveBeenCalledWith({ ...filters, sort: "price-asc" });
  });

  it("emits price changes", () => {
    const { onChange } = renderProductFilters();

    fireEvent.change(screen.getByLabelText("Prezzo massimo"), { target: { value: "20000" } });

    expect(onChange).toHaveBeenCalledWith({ ...filters, maxPriceCents: 20000 });
  });

  it("emits search changes and reset actions", () => {
    const { onChange, onReset } = renderProductFilters({
      currentFilters: { ...filters, query: "desk" },
    });

    fireEvent.change(screen.getByLabelText("Cerca prodotti"), { target: { value: "audio" } });
    fireEvent.click(screen.getByRole("button", { name: "Reimposta filtri" }));

    expect(onChange).toHaveBeenCalledWith({ ...filters, query: "audio" });
    expect(onReset).toHaveBeenCalled();
  });
});
