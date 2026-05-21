import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { AddToCartButton } from "@/components/product/AddToCartButton";
import { Badge } from "@/components/ui/Badge";
import { Price } from "@/components/ui/Price";
import { getProductBySlug, products } from "@/data/products";
import { withBasePath } from "@/lib/routing";

interface ProductPageProps {
  readonly params: Promise<{
    readonly slug: string;
  }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Prodotto non trovato",
    };
  }

  return {
    description: product.description,
    openGraph: {
      images: [withBasePath(product.imagePath)],
      title: product.name,
    },
    title: product.name,
  };
}

export default async function ProductPage({ params }: ProductPageProps): Promise<ReactNode> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
      <div className="grid gap-4">
        <Image
          alt={product.name}
          className="aspect-[4/3] w-full rounded-lg bg-stone-100 object-cover"
          height={900}
          src={withBasePath(product.imagePath)}
          width={1200}
        />
        <div className="grid grid-cols-2 gap-4">
          {product.gallery.slice(1).map((imagePath) => (
            <Image
              alt=""
              className="aspect-[4/3] w-full rounded-lg bg-stone-100 object-cover"
              height={450}
              key={imagePath}
              src={withBasePath(imagePath)}
              width={600}
            />
          ))}
        </div>
      </div>
      <div className="lg:pt-8">
        <Badge>{product.category}</Badge>
        <h1 className="mt-4 text-4xl font-semibold text-stone-950">{product.name}</h1>
        <p className="mt-4 text-lg leading-8 text-stone-600">{product.description}</p>
        <div className="mt-6 flex items-center gap-4">
          <Price
            amountCents={product.priceCents}
            className="text-2xl font-semibold text-stone-950"
            compareAtCents={product.compareAtPriceCents}
          />
          <span className="text-sm font-medium text-stone-500">
            {product.rating.toFixed(1)} / 5 da {product.reviewCount} recensioni
          </span>
        </div>
        <div className="mt-8">
          <AddToCartButton product={product} />
        </div>
        <div className="mt-10 border-t border-stone-200 pt-8">
          <h2 className="text-lg font-semibold text-stone-950">Dettagli prodotto</h2>
          <ul className="mt-4 grid gap-3 text-stone-600">
            {product.features.map((feature) => (
              <li className="flex gap-3" key={feature}>
                <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-emerald-700" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
