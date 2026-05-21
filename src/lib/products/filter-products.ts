import type { Product, ProductCategory } from "@/types/product";

export type ProductSort = "featured" | "name-asc" | "price-asc" | "price-desc";

export interface ProductFilterState {
  readonly category: ProductCategory | "all";
  readonly maxPriceCents: number;
  readonly sort: ProductSort;
}

/**
 * Filters and sorts the static product catalog without mutating the source array.
 */
export function filterProducts(
  products: readonly Product[],
  filters: ProductFilterState,
): Product[] {
  return products
    .filter((product) => filters.category === "all" || product.category === filters.category)
    .filter((product) => product.priceCents <= filters.maxPriceCents)
    .toSorted((left, right) => {
      switch (filters.sort) {
        case "name-asc":
          return left.name.localeCompare(right.name);
        case "price-asc":
          return left.priceCents - right.priceCents;
        case "price-desc":
          return right.priceCents - left.priceCents;
        case "featured":
          return left.featuredRank - right.featuredRank;
      }
    });
}

export function getMaxCatalogPrice(products: readonly Product[]): number {
  return Math.max(...products.map((product) => product.priceCents));
}
