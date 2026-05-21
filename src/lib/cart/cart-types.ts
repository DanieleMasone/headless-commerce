import type { Product } from "@/types/product";

export interface CartLineItem {
  readonly product: Product;
  readonly quantity: number;
}

export interface CartState {
  readonly items: readonly CartLineItem[];
  readonly isOpen: boolean;
}

export type CartAction =
  | { readonly type: "add"; readonly product: Product; readonly quantity?: number }
  | { readonly type: "clear" }
  | { readonly type: "close" }
  | { readonly type: "decrement"; readonly slug: string }
  | { readonly type: "hydrate"; readonly items: readonly CartLineItem[] }
  | { readonly type: "increment"; readonly slug: string }
  | { readonly type: "open" }
  | { readonly type: "remove"; readonly slug: string };
