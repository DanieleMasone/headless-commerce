"use client";

import { useMemo, useState, type ReactNode } from "react";

import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductGrid } from "@/components/product/ProductGrid";
import {
  getMaxCatalogPrice,
  filterProducts,
  type ProductFilterState,
} from "@/lib/products/filter-products";
import type { Product, ProductCategory } from "@/types/product";

export interface ProductCatalogProps {
  readonly categories: readonly ProductCategory[];
  readonly products: readonly Product[];
}

export function ProductCatalog({ categories, products }: ProductCatalogProps): ReactNode {
  const maxPriceCents = useMemo(() => getMaxCatalogPrice(products), [products]);
  const initialFilters = useMemo<ProductFilterState>(
    () => ({
      category: "all",
      maxPriceCents,
      query: "",
      sort: "featured",
    }),
    [maxPriceCents],
  );
  const [filters, setFilters] = useState<ProductFilterState>(initialFilters);
  const filteredProducts = useMemo(() => filterProducts(products, filters), [filters, products]);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8" id="catalogo">
      <div className="flex flex-col gap-3 py-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-800 dark:text-emerald-300">
            Catalogo curato
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-stone-950 dark:text-white">
            Prodotti pronti per il lavoro ibrido
          </h2>
        </div>
        <p className="max-w-xl text-stone-600 dark:text-stone-300">
          Un catalogo mock locale progettato per dimostrare UX, performance e architettura frontend
          senza dipendere da un backend commerce.
        </p>
      </div>
      <ProductFilters
        categories={categories}
        filters={filters}
        maxPriceCents={maxPriceCents}
        onChange={setFilters}
        onReset={() => setFilters(initialFilters)}
        resultCount={filteredProducts.length}
        totalCount={products.length}
      />
      <ProductGrid onResetFilters={() => setFilters(initialFilters)} products={filteredProducts} />
    </section>
  );
}
