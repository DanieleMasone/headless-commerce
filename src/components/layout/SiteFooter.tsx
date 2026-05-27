import Link from "next/link";
import type { ReactNode } from "react";

import { withBasePath } from "@/lib/routing";

const githubRepositoryUrl =
  process.env.NEXT_PUBLIC_GITHUB_REPO_URL ?? "https://github.com/danielemasone/headless-commerce";

export function SiteFooter(): ReactNode {
  const links = [
    { href: withBasePath("/coverage/"), label: "Coverage" },
    { href: withBasePath("/docs/"), label: "Docs" },
    { href: githubRepositoryUrl, label: "GitHub" },
  ] as const;

  return (
    <footer className="border-t border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-sm text-stone-600 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8 dark:text-stone-300">
        <div>
          <Link className="font-semibold text-stone-950 dark:text-white" href="/">
            Headless Commerce
          </Link>
          <p className="mt-1 max-w-xl">
            Catalogo statico, carrello persistente e checkout mock pubblicati su GitHub Pages con
            report navigabili.
          </p>
        </div>
        <nav aria-label="Risorse progetto" className="flex flex-wrap gap-4">
          <Link
            className="font-semibold text-stone-700 hover:text-emerald-700 dark:text-stone-200 dark:hover:text-emerald-300"
            href="/engineering"
          >
            Engineering
          </Link>
          {links.map((link) => (
            <a
              className="font-semibold text-stone-700 hover:text-emerald-700 dark:text-stone-200 dark:hover:text-emerald-300"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
