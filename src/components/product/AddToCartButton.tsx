"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart/cart-store";
import type { Product } from "@/types/product";

export interface AddToCartButtonProps {
  readonly product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps): ReactNode {
  const { addItem } = useCart();

  return (
    <Button aria-label={`Aggiungi ${product.name} al carrello`} onClick={() => addItem(product)}>
      Aggiungi al carrello
    </Button>
  );
}
