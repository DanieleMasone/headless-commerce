/**
 * Product categories used by the local mock catalog.
 */
export type ProductCategory = "Workspace" | "Audio" | "Travel" | "Lifestyle";

/**
 * Static product model for the headless catalog.
 *
 * Product content is intentionally local to keep the portfolio deployable on
 * GitHub Pages without a commerce backend, server runtime, or private keys.
 */
export interface Product {
  readonly slug: string;
  readonly name: string;
  readonly category: ProductCategory;
  readonly priceCents: number;
  readonly compareAtPriceCents?: number;
  readonly imagePath: string;
  readonly gallery: readonly string[];
  readonly tagline: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly rating: number;
  readonly reviewCount: number;
  readonly featuredRank: number;
}
