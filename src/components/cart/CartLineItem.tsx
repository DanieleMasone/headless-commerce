"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import type { CartLineItem as CartLineItemType } from "@/lib/cart/cart-types";
import { withBasePath } from "@/lib/routing";

export interface CartLineItemProps {
  readonly item: CartLineItemType;
  readonly onDecrement: (slug: string) => void;
  readonly onIncrement: (slug: string) => void;
  readonly onRemove: (slug: string) => void;
}

export function CartLineItem({
  item,
  onDecrement,
  onIncrement,
  onRemove,
}: CartLineItemProps): ReactNode {
  const { product, quantity } = item;

  return (
    <article className="grid grid-cols-[72px_1fr] gap-4 border-b border-stone-200 py-4 dark:border-stone-800">
      <Image
        alt=""
        className="h-[72px] w-[72px] rounded-md bg-stone-100 object-cover dark:bg-stone-900"
        height={72}
        src={withBasePath(product.imagePath)}
        width={72}
      />
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-stone-950 dark:text-white">{product.name}</h3>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">{product.category}</p>
          </div>
          <Price amountCents={product.priceCents * quantity} className="text-sm font-semibold" />
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div aria-label={`Quantità ${product.name}`} className="flex items-center gap-2">
            <Button
              aria-label={`Riduci quantità ${product.name}`}
              onClick={() => onDecrement(product.slug)}
              size="sm"
              variant="secondary"
            >
              -
            </Button>
            <span className="min-w-6 text-center text-sm font-semibold">{quantity}</span>
            <Button
              aria-label={`Aumenta quantità ${product.name}`}
              onClick={() => onIncrement(product.slug)}
              size="sm"
              variant="secondary"
            >
              +
            </Button>
          </div>
          <Button
            aria-label={`Rimuovi ${product.name}`}
            onClick={() => onRemove(product.slug)}
            size="sm"
            variant="ghost"
          >
            Rimuovi
          </Button>
        </div>
      </div>
    </article>
  );
}
