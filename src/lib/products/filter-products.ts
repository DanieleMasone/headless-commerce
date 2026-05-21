import type { Product, ProductCategory } from "@/types/product";

export type ProductSort = "featured" | "name-asc" | "price-asc" | "price-desc";

/**
 * Client-side catalog filter state controlled by the product filters UI.
 */
export interface ProductFilterState {
  readonly category: ProductCategory | "all";
  readonly maxPriceCents: number;
  readonly query: string;
  readonly sort: ProductSort;
}

function normalizeSearch(value: string): string {
  return value.trim().toLocaleLowerCase("it-IT");
}

function productMatchesQuery(product: Product, query: string): boolean {
  if (!query) {
    return true;
  }

  const searchableText = [
    product.name,
    product.category,
    product.tagline,
    product.description,
    ...product.features,
  ]
    .join(" ")
    .toLocaleLowerCase("it-IT");

  return searchableText.includes(query);
}

/**
 * Filters, searches, and sorts the static product catalog without mutating the source array.
 */
export function filterProducts(
  products: readonly Product[],
  filters: ProductFilterState,
): Product[] {
  const query = normalizeSearch(filters.query);

  return products
    .filter((product) => productMatchesQuery(product, query))
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
