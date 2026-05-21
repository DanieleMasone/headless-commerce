"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { withBasePath } from "@/lib/routing";
import type { Product } from "@/types/product";

export interface ProductCardProps {
  readonly imageLoading?: "eager" | "lazy";
  readonly onAddToCart: (product: Product) => void;
  readonly product: Product;
}

export function ProductCard({
  imageLoading = "lazy",
  onAddToCart,
  product,
}: ProductCardProps): ReactNode {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-xl hover:shadow-stone-200/70 dark:border-stone-800 dark:bg-stone-950 dark:hover:border-stone-700 dark:hover:shadow-black/30">
      <Link aria-label={`Apri ${product.name}`} href={`/product/${product.slug}`}>
        <Image
          alt={product.name}
          className="aspect-[4/3] w-full bg-stone-100 object-cover transition duration-300 group-hover:scale-[1.02] dark:bg-stone-900"
          height={900}
          loading={imageLoading}
          src={withBasePath(product.imagePath)}
          width={1200}
        />
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <Badge>{product.category}</Badge>
          <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
            {product.rating.toFixed(1)} / 5
          </span>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-stone-950 dark:text-white">
            <Link
              className="hover:text-emerald-700 dark:hover:text-emerald-300"
              href={`/product/${product.slug}`}
            >
              {product.name}
            </Link>
          </h3>
          <p className="line-clamp-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
            {product.tagline}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          <Price
            amountCents={product.priceCents}
            className="font-semibold text-stone-950 dark:text-white"
            compareAtCents={product.compareAtPriceCents}
          />
          <Button
            aria-label={`Aggiungi ${product.name} al carrello`}
            onClick={() => onAddToCart(product)}
            size="sm"
          >
            Aggiungi
          </Button>
        </div>
      </div>
    </article>
  );
}
