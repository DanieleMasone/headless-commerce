import type { CartAction, CartLineItem, CartState } from "@/lib/cart/cart-types";

export const initialCartState: CartState = {
  isOpen: false,
  items: [],
};

function normalizeQuantity(quantity: number | undefined): number {
  if (!quantity || !Number.isFinite(quantity)) {
    return 1;
  }

  return Math.max(1, Math.floor(quantity));
}

function replaceLineItem(
  items: readonly CartLineItem[],
  slug: string,
  quantity: number,
): CartLineItem[] {
  return items
    .map((item) => (item.product.slug === slug ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0);
}

/**
 * Pure cart state reducer used by the cart context and unit tests.
 */
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const quantity = normalizeQuantity(action.quantity);
      const existingItem = state.items.find((item) => item.product.slug === action.product.slug);

      if (!existingItem) {
        return {
          ...state,
          isOpen: true,
          items: [...state.items, { product: action.product, quantity }],
        };
      }

      return {
        ...state,
        isOpen: true,
        items: replaceLineItem(state.items, action.product.slug, existingItem.quantity + quantity),
      };
    }

    case "clear":
      return { ...state, items: [] };

    case "close":
      return { ...state, isOpen: false };

    case "decrement": {
      const existingItem = state.items.find((item) => item.product.slug === action.slug);

      if (!existingItem) {
        return state;
      }

      return {
        ...state,
        items: replaceLineItem(state.items, action.slug, existingItem.quantity - 1),
      };
    }

    case "hydrate":
      return { ...state, items: action.items };

    case "increment": {
      const existingItem = state.items.find((item) => item.product.slug === action.slug);

      if (!existingItem) {
        return state;
      }

      return {
        ...state,
        items: replaceLineItem(state.items, action.slug, existingItem.quantity + 1),
      };
    }

    case "open":
      return { ...state, isOpen: true };

    case "remove":
      return {
        ...state,
        items: state.items.filter((item) => item.product.slug !== action.slug),
      };
  }
}

export function getCartItemCount(items: readonly CartLineItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartSubtotal(items: readonly CartLineItem[]): number {
  return items.reduce((total, item) => total + item.product.priceCents * item.quantity, 0);
}
