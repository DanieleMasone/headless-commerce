import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

import { ProductCatalog } from "@/components/product/ProductCatalog";
import { productCategories, products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { withBasePath } from "@/lib/routing";

export default function HomePage(): ReactNode {
  const heroProduct = products[0];

  return (
    <>
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase text-emerald-800">
              Static headless commerce
            </p>
            <h1 className="mt-4 max-w-3xl text-5xl font-semibold text-stone-950">
              Commerce frontend veloce, modulare e pronto per GitHub Pages.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
              Un catalogo premium con filtri immediati, carrello laterale persistente e checkout
              Stripe mock, progettato per dimostrare architettura frontend production-minded senza
              backend in produzione.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-stone-950 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                href="#catalogo"
              >
                Esplora catalogo
              </Link>
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-stone-300 bg-white px-5 text-sm font-semibold text-stone-950 transition hover:border-emerald-700 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                href={`/product/${heroProduct.slug}`}
              >
                Vedi prodotto hero
              </Link>
            </div>
          </div>
          <div className="grid content-end gap-4">
            <Image
              alt={heroProduct.name}
              className="aspect-[4/3] w-full rounded-lg bg-stone-100 object-cover"
              height={900}
              loading="eager"
              priority
              src={withBasePath(heroProduct.imagePath)}
              width={1200}
            />
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                <span className="block font-semibold text-stone-950">8</span>
                <span className="text-stone-600">Prodotti locali</span>
              </div>
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                <span className="block font-semibold text-stone-950">
                  {formatPrice(heroProduct.priceCents)}
                </span>
                <span className="text-stone-600">Hero price</span>
              </div>
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                <span className="block font-semibold text-stone-950">0</span>
                <span className="text-stone-600">Server runtime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductCatalog categories={productCategories} products={products} />
    </>
  );
}
