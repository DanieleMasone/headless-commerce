"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import type { ProductFilterState, ProductSort } from "@/lib/products/filter-products";
import type { ProductCategory } from "@/types/product";

/**
 * Props for the controlled product filters panel.
 */
export interface ProductFiltersProps {
  /** Catalog categories rendered as quick filter buttons. */
  readonly categories: readonly ProductCategory[];
  /** Current filter state owned by the catalog container. */
  readonly filters: ProductFilterState;
  /** Upper price bound used by the range input and reset logic. */
  readonly maxPriceCents: number;
  /** Emits every client-side filter, search, and sort change. */
  readonly onChange: (filters: ProductFilterState) => void;
  /** Restores the catalog to its default filter state. */
  readonly onReset: () => void;
  /** Number of products visible after filtering. */
  readonly resultCount: number;
  /** Number of products available before filtering. */
  readonly totalCount: number;
}

const sortOptions = [
  { label: "In evidenza", value: "featured" },
  { label: "Nome A-Z", value: "name-asc" },
  { label: "Prezzo crescente", value: "price-asc" },
  { label: "Prezzo decrescente", value: "price-desc" },
] as const satisfies readonly { label: string; value: ProductSort }[];

/**
 * Controlled, reload-free product filtering surface for the static catalog.
 */
export function ProductFilters({
  categories,
  filters,
  maxPriceCents,
  onChange,
  onReset,
  resultCount,
  totalCount,
}: ProductFiltersProps): ReactNode {
  const resultLabel = resultCount === 1 ? "1 prodotto trovato" : `${resultCount} prodotti trovati`;
  const hasActiveFilters =
    filters.category !== "all" ||
    filters.maxPriceCents !== maxPriceCents ||
    filters.query.trim().length > 0 ||
    filters.sort !== "featured";

  return (
    <section
      aria-label="Filtri catalogo"
      className="grid gap-5 border-y border-stone-200 bg-white py-5 lg:grid-cols-[minmax(240px,1fr)_1fr_260px_220px] dark:border-stone-800 dark:bg-stone-950"
    >
      <label className="block" htmlFor="product-search">
        <span className="text-sm font-semibold text-stone-950 dark:text-white">Cerca prodotti</span>
        <input
          aria-label="Cerca prodotti"
          className="mt-3 h-11 w-full rounded-md border border-stone-300 bg-white px-3 text-sm font-medium text-stone-950 placeholder:text-stone-400 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-100 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:placeholder:text-stone-500 dark:focus:border-emerald-400 dark:focus:ring-emerald-900"
          id="product-search"
          onChange={(event) => onChange({ ...filters, query: event.currentTarget.value })}
          placeholder="Desk, audio, travel..."
          type="search"
          value={filters.query}
        />
      </label>

      <div>
        <span className="text-sm font-semibold text-stone-950 dark:text-white">Categoria</span>
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
        <span className="text-sm font-semibold text-stone-950 dark:text-white">
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
        <span className="text-sm font-semibold text-stone-950 dark:text-white">Ordinamento</span>
        <select
          aria-label="Ordinamento"
          className="mt-3 h-11 w-full rounded-md border border-stone-300 bg-white px-3 text-sm font-medium text-stone-950 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-100 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-900"
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
      </label>

      <div className="flex flex-col gap-2 lg:col-span-4 lg:flex-row lg:items-center lg:justify-between">
        <p aria-live="polite" className="text-sm text-stone-600 dark:text-stone-300">
          {resultLabel} su {totalCount} nel catalogo statico.
        </p>
        <Button disabled={!hasActiveFilters} onClick={onReset} size="sm" variant="ghost">
          Reimposta filtri
        </Button>
      </div>
    </section>
  );
}
