"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart/cart-store";
import { formatPrice } from "@/lib/format";

export function CartButton(): ReactNode {
  const { itemCount, openCart, subtotalCents } = useCart();
  const subtotalLabel = formatPrice(subtotalCents);

  return (
    <Button
      aria-label={`Apri carrello, ${itemCount} articoli, totale ${subtotalLabel}`}
      className="min-w-28"
      onClick={openCart}
      variant="secondary"
    >
      Carrello
      <span
        className="rounded-md bg-stone-950 px-2 py-0.5 text-xs text-white"
        data-testid="cart-count"
      >
        {itemCount}
      </span>
      <span className="sr-only">Totale carrello {subtotalLabel}</span>
    </Button>
  );
}
