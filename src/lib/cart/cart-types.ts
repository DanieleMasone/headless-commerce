import type { Product } from "@/types/product";

/**
 * Single cart row pairing a product snapshot with a shopper quantity.
 */
export interface CartLineItem {
  readonly product: Product;
  readonly quantity: number;
}

/**
 * Reducer state for the cart drawer and persisted line items.
 */
export interface CartState {
  readonly items: readonly CartLineItem[];
  readonly isOpen: boolean;
}

/**
 * Intent-based cart actions consumed by the pure reducer.
 */
export type CartAction =
  | { readonly type: "add"; readonly product: Product; readonly quantity?: number }
  | { readonly type: "clear" }
  | { readonly type: "close" }
  | { readonly type: "decrement"; readonly slug: string }
  | { readonly type: "hydrate"; readonly items: readonly CartLineItem[] }
  | { readonly type: "increment"; readonly slug: string }
  | { readonly type: "open" }
  | { readonly type: "remove"; readonly slug: string };
