import Link from "next/link";
import type { ReactNode } from "react";

import { CartButton } from "@/components/cart/CartButton";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { withBasePath } from "@/lib/routing";

const githubRepositoryUrl =
  process.env.NEXT_PUBLIC_GITHUB_REPO_URL ?? "https://github.com/danielemasone/headless-commerce";

export function SiteHeader(): ReactNode {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur dark:border-stone-800 dark:bg-stone-950/90">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link className="text-base font-bold text-stone-950 dark:text-white" href="/">
          <span className="sm:hidden">HC</span>
          <span className="hidden sm:inline">Headless Commerce</span>
        </Link>
        <nav
          aria-label="Navigazione principale"
          className="hidden items-center gap-5 text-sm font-medium text-stone-600 lg:flex dark:text-stone-300"
        >
          <Link className="hover:text-emerald-700 dark:hover:text-emerald-300" href="/#catalogo">
            Catalogo
          </Link>
          <Link className="hover:text-emerald-700 dark:hover:text-emerald-300" href="/engineering">
            Engineering
          </Link>
          <Link className="hover:text-emerald-700 dark:hover:text-emerald-300" href="/checkout">
            Checkout demo
          </Link>
          <a
            className="hover:text-emerald-700 dark:hover:text-emerald-300"
            href={withBasePath("/coverage/")}
          >
            Coverage
          </a>
          <a
            className="hover:text-emerald-700 dark:hover:text-emerald-300"
            href={withBasePath("/docs/")}
          >
            Docs
          </a>
          <a
            className="hover:text-emerald-700 dark:hover:text-emerald-300"
            href={githubRepositoryUrl}
          >
            GitHub
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <CartButton />
        </div>
      </div>
    </header>
  );
}
