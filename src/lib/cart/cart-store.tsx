"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import {
  cartReducer,
  getCartItemCount,
  getCartSubtotal,
  initialCartState,
} from "@/lib/cart/cart-reducer";
import type { CartLineItem, CartState } from "@/lib/cart/cart-types";
import type { Product } from "@/types/product";

const storageKey = "headless-commerce-cart";

/**
 * Public cart context contract exposed through `useCart`.
 */
export interface CartContextValue extends CartState {
  readonly addItem: (product: Product, quantity?: number) => void;
  readonly clearCart: () => void;
  readonly closeCart: () => void;
  readonly decrementItem: (slug: string) => void;
  readonly incrementItem: (slug: string) => void;
  readonly itemCount: number;
  readonly openCart: () => void;
  readonly removeItem: (slug: string) => void;
  readonly subtotalCents: number;
}

/**
 * Cart provider options used by the application shell and component tests.
 */
export interface CartProviderProps {
  readonly children: ReactNode;
  readonly initialState?: CartState;
  readonly persist?: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseStoredItems(value: string | null): CartLineItem[] {
  if (!value) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is CartLineItem => {
      if (!isRecord(item) || !isRecord(item.product)) {
        return false;
      }

      return typeof item.product.slug === "string" && typeof item.quantity === "number";
    });
  } catch {
    return [];
  }
}

/**
 * Client-side cart provider with reducer state and localStorage persistence.
 */
export function CartProvider({
  children,
  initialState,
  persist = true,
}: CartProviderProps): ReactNode {
  const [state, dispatch] = useReducer(cartReducer, initialState ?? initialCartState);

  useEffect(() => {
    if (!persist || initialState) {
      return;
    }

    dispatch({ items: parseStoredItems(window.localStorage.getItem(storageKey)), type: "hydrate" });
  }, [initialState, persist]);

  useEffect(() => {
    if (!persist) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(state.items));
  }, [persist, state.items]);

  const addItem = useCallback((product: Product, quantity?: number) => {
    dispatch({ product, quantity, type: "add" });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: "close" });
  }, []);

  const decrementItem = useCallback((slug: string) => {
    dispatch({ slug, type: "decrement" });
  }, []);

  const incrementItem = useCallback((slug: string) => {
    dispatch({ slug, type: "increment" });
  }, []);

  const openCart = useCallback(() => {
    dispatch({ type: "open" });
  }, []);

  const removeItem = useCallback((slug: string) => {
    dispatch({ slug, type: "remove" });
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      ...state,
      addItem,
      clearCart,
      closeCart,
      decrementItem,
      incrementItem,
      itemCount: getCartItemCount(state.items),
      openCart,
      removeItem,
      subtotalCents: getCartSubtotal(state.items),
    }),
    [addItem, clearCart, closeCart, decrementItem, incrementItem, openCart, removeItem, state],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
}
