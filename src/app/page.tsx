import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

import { ProductCatalog } from "@/components/product/ProductCatalog";
import { Badge } from "@/components/ui/Badge";
import { productCategories, products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { withBasePath } from "@/lib/routing";

const qualitySignals = [
  {
    detail: "Vitest + RTL + Playwright con soglie bloccanti su statement, branch, function e line.",
    label: "Coverage gated",
  },
  {
    detail: "Drawer accessibile, focus management, Escape close e stato annunciato con aria-live.",
    label: "Accessible cart",
  },
  {
    detail: "TypeScript strict, dati locali tipizzati e documentazione TypeDoc generata in CI.",
    label: "Typed architecture",
  },
] as const;

const architectureSteps = [
  "Catalogo mock versionato nel repository",
  "Filtri, search e carrello eseguiti lato client",
  "Checkout Stripe simulato senza segreti o chiamate server",
  "Build esportata in out/ e servita da GitHub Pages",
] as const;

export default function HomePage(): ReactNode {
  const heroProduct = products[0];

  return (
    <>
      <section className="border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase text-emerald-800 dark:text-emerald-300">
              Static headless commerce
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold text-stone-950 sm:text-5xl dark:text-white">
              Headless commerce statico con UX da prodotto reale.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600 dark:text-stone-300">
              Un catalogo premium con search istantanea, filtri senza reload, carrello laterale
              persistente e checkout Stripe mock. Tutto resta esportabile come asset statici per
              GitHub Pages.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>Static Export</Badge>
              <Badge className="border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-700/70 dark:bg-sky-950 dark:text-sky-200">
                No Server Runtime
              </Badge>
              <Badge className="border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-700/70 dark:bg-amber-950 dark:text-amber-200">
                Coverage gated
              </Badge>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-stone-950 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:bg-emerald-400 dark:text-stone-950 dark:hover:bg-emerald-300"
                href="#catalogo"
              >
                Esplora catalogo
              </Link>
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-stone-300 bg-white px-5 text-sm font-semibold text-stone-950 transition hover:border-emerald-700 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
                href={`/product/${heroProduct.slug}`}
              >
                Vedi configurazione Atlas
              </Link>
            </div>
          </div>
          <div className="grid content-end gap-4">
            <Image
              alt={heroProduct.name}
              className="aspect-[4/3] w-full rounded-lg bg-stone-100 object-cover shadow-2xl shadow-stone-200/80 dark:bg-stone-900 dark:shadow-black/40"
              height={900}
              loading="eager"
              priority
              src={withBasePath(heroProduct.imagePath)}
              width={1200}
            />
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900">
                <span className="block font-semibold text-stone-950 dark:text-white">8</span>
                <span className="text-stone-600 dark:text-stone-300">Prodotti locali</span>
              </div>
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900">
                <span className="block font-semibold text-stone-950 dark:text-white">
                  {formatPrice(heroProduct.priceCents)}
                </span>
                <span className="text-stone-600 dark:text-stone-300">Prezzo kit Atlas</span>
              </div>
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900">
                <span className="block font-semibold text-stone-950 dark:text-white">0</span>
                <span className="text-stone-600 dark:text-stone-300">Runtime server</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductCatalog categories={productCategories} products={products} />
      <section className="border-y border-stone-200 bg-stone-100/70 dark:border-stone-800 dark:bg-stone-900/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-800 dark:text-emerald-300">
              Engineering Quality
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-950 dark:text-white">
              La qualità tecnica è parte della UX.
            </h2>
            <p className="mt-4 text-stone-600 dark:text-stone-300">
              Il progetto rende visibili test, documentazione e vincoli static export invece di
              nasconderli in CI.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {qualitySignals.map((signal) => (
              <article
                className="rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-950"
                key={signal.label}
              >
                <h3 className="text-base font-semibold text-stone-950 dark:text-white">
                  {signal.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">
                  {signal.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-stone-950" aria-labelledby="static-architecture">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-emerald-800 dark:text-emerald-300">
              Static Commerce Architecture
            </p>
            <h2
              className="mt-2 text-3xl font-semibold text-stone-950 dark:text-white"
              id="static-architecture"
            >
              Un flusso commerce progettato per Pages dalla prima decisione tecnica.
            </h2>
          </div>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {architectureSteps.map((step, index) => (
              <li
                className="rounded-lg border border-stone-200 bg-stone-50 p-5 dark:border-stone-800 dark:bg-stone-900"
                key={step}
              >
                <span className="text-xs font-semibold uppercase text-emerald-800 dark:text-emerald-300">
                  Step {index + 1}
                </span>
                <p className="mt-3 text-sm font-semibold leading-6 text-stone-950 dark:text-white">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
