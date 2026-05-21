"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import type { ProductFilterState, ProductSort } from "@/lib/products/filter-products";
import type { ProductCategory } from "@/types/product";

export interface ProductFiltersProps {
  readonly categories: readonly ProductCategory[];
  readonly filters: ProductFilterState;
  readonly maxPriceCents: number;
  readonly onChange: (filters: ProductFilterState) => void;
  readonly resultCount: number;
}

const sortOptions = [
  { label: "In evidenza", value: "featured" },
  { label: "Nome A-Z", value: "name-asc" },
  { label: "Prezzo crescente", value: "price-asc" },
  { label: "Prezzo decrescente", value: "price-desc" },
] as const satisfies readonly { label: string; value: ProductSort }[];

export function ProductFilters({
  categories,
  filters,
  maxPriceCents,
  onChange,
  resultCount,
}: ProductFiltersProps): ReactNode {
  return (
    <section
      aria-label="Filtri catalogo"
      className="grid gap-5 border-y border-stone-200 bg-white py-5 lg:grid-cols-[1fr_280px_220px]"
    >
      <div>
        <span className="text-sm font-semibold text-stone-950">Categoria</span>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filtra per categoria">
          <Button
            aria-pressed={filters.category === "all"}
            onClick={() => onChange({ ...filters, category: "all" })}
            size="sm"
            variant={filters.category === "all" ? "primary" : "secondary"}
          >
            Tutte
          </Button>
          {categories.map((category) => (
            <Button
              aria-pressed={filters.category === category}
              key={category}
              onClick={() => onChange({ ...filters, category })}
              size="sm"
              variant={filters.category === category ? "primary" : "secondary"}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <label className="block" htmlFor="product-max-price">
        <span className="text-sm font-semibold text-stone-950">
          Prezzo fino a {formatPrice(filters.maxPriceCents)}
        </span>
        <input
          aria-label="Prezzo massimo"
          className="mt-4 h-2 w-full accent-emerald-700"
          id="product-max-price"
          max={maxPriceCents}
          min={0}
          onChange={(event) =>
            onChange({ ...filters, maxPriceCents: Number(event.currentTarget.value) })
          }
          step={500}
          type="range"
          value={filters.maxPriceCents}
        />
      </label>

      <label className="block" htmlFor="product-sort">
        <span className="text-sm font-semibold text-stone-950">Ordinamento</span>
        <select
          aria-label="Ordinamento"
          className="mt-3 h-11 w-full rounded-md border border-stone-300 bg-white px-3 text-sm font-medium text-stone-950 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          id="product-sort"
          onChange={(event) =>
            onChange({ ...filters, sort: event.currentTarget.value as ProductSort })
          }
          value={filters.sort}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="mt-2 block text-sm text-stone-500">{resultCount} prodotti trovati</span>
      </label>
    </section>
  );
}
