"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { CartLineItem } from "@/components/cart/CartLineItem";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { Price } from "@/components/ui/Price";
import { useCart } from "@/lib/cart/cart-store";

/**
 * Public props for the cart drawer shell rendered from the app layout.
 */
export interface CartDrawerProps {
  readonly title?: string;
}

/**
 * Accessible cart drawer bound to the global cart context.
 */
export function CartDrawer({ title = "Carrello" }: CartDrawerProps): ReactNode {
  const {
    clearCart,
    closeCart,
    decrementItem,
    incrementItem,
    isOpen,
    itemCount,
    items,
    removeItem,
    subtotalCents,
  } = useCart();

  const hasItems = items.length > 0;
  const itemLabel = itemCount === 1 ? "1 articolo" : `${itemCount} articoli`;
  const statusMessage = hasItems
    ? `${itemLabel} nel carrello, subtotale aggiornato.`
    : "Il carrello è vuoto.";

  return (
    <Drawer
      footer={
        hasItems ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-base font-semibold text-stone-950 dark:text-white">
              <span>Subtotale</span>
              <Price amountCents={subtotalCents} />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Checkout Stripe simulato: nessuna carta reale e nessuna chiamata server.
            </p>
            <Link
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-stone-950 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:bg-emerald-400 dark:text-stone-950 dark:hover:bg-emerald-300"
              href="/checkout"
              onClick={closeCart}
            >
              Vai al checkout
            </Link>
            <Button className="w-full" onClick={clearCart} variant="ghost">
              Svuota carrello
            </Button>
          </div>
        ) : null
      }
      isOpen={isOpen}
      onClose={closeCart}
      title={`${title} (${itemCount})`}
    >
      <p aria-live="polite" className="sr-only">
        {statusMessage}
      </p>
      {hasItems ? (
        <div aria-live="polite">
          {items.map((item) => (
            <CartLineItem
              item={item}
              key={item.product.slug}
              onDecrement={decrementItem}
              onIncrement={incrementItem}
              onRemove={removeItem}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center text-center">
          <h3 className="text-lg font-semibold text-stone-950 dark:text-white">
            Il carrello è vuoto
          </h3>
          <p className="mt-2 max-w-xs text-sm text-stone-500 dark:text-stone-400">
            Salva qui gli articoli che vuoi confrontare e completa il checkout nella demo Stripe.
          </p>
          <Button className="mt-5" onClick={closeCart} variant="secondary">
            Continua lo shopping
          </Button>
        </div>
      )}
    </Drawer>
  );
}
