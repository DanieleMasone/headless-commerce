import Link from "next/link";
import type { ReactNode } from "react";

import { CartButton } from "@/components/cart/CartButton";

export function SiteHeader(): ReactNode {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link className="text-base font-bold text-stone-950" href="/">
          Headless Commerce
        </Link>
        <nav
          aria-label="Navigazione principale"
          className="hidden items-center gap-6 text-sm font-medium text-stone-600 md:flex"
        >
          <Link className="hover:text-emerald-700" href="/#catalogo">
            Catalogo
          </Link>
          <Link className="hover:text-emerald-700" href="/checkout">
            Checkout demo
          </Link>
        </nav>
        <CartButton />
      </div>
    </header>
  );
}
