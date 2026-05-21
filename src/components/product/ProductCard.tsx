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
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white">
      <Link aria-label={`Apri ${product.name}`} href={`/product/${product.slug}`}>
        <Image
          alt={product.name}
          className="aspect-[4/3] w-full bg-stone-100 object-cover transition duration-300 group-hover:scale-[1.02]"
          height={900}
          loading={imageLoading}
          src={withBasePath(product.imagePath)}
          width={1200}
        />
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <Badge>{product.category}</Badge>
          <span className="text-xs font-semibold text-stone-500">
            {product.rating.toFixed(1)} / 5
          </span>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-stone-950">
            <Link className="hover:text-emerald-700" href={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          <p className="line-clamp-2 text-sm leading-6 text-stone-600">{product.tagline}</p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          <Price
            amountCents={product.priceCents}
            className="font-semibold text-stone-950"
            compareAtCents={product.compareAtPriceCents}
          />
          <Button onClick={() => onAddToCart(product)} size="sm">
            Aggiungi
          </Button>
        </div>
      </div>
    </article>
  );
}
