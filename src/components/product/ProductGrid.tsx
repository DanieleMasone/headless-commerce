"use client";

import type { ReactNode } from "react";

import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart/cart-store";
import type { Product } from "@/types/product";

export interface ProductGridProps {
  readonly onResetFilters: () => void;
  readonly products: readonly Product[];
}

export function ProductGrid({ onResetFilters, products }: ProductGridProps): ReactNode {
  const { addItem } = useCart();

  if (products.length === 0) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center border-b border-stone-200 text-center">
        <h2 className="text-2xl font-semibold text-stone-950">Nessun prodotto trovato</h2>
        <p className="mt-3 max-w-md text-stone-600">
          Riduci i filtri o aumenta il prezzo massimo per vedere più articoli.
        </p>
        <Button className="mt-6" onClick={onResetFilters} variant="secondary">
          Reimposta filtri
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-5 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard
          imageLoading={index === 0 ? "eager" : "lazy"}
          key={product.slug}
          onAddToCart={addItem}
          product={product}
        />
      ))}
    </div>
  );
}
