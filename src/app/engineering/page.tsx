import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { withBasePath } from "@/lib/routing";

const githubRepositoryUrl =
  process.env.NEXT_PUBLIC_GITHUB_REPO_URL ?? "https://github.com/danielemasone/headless-commerce";

const engineeringLinks = [
  {
    href: `${githubRepositoryUrl}/actions/workflows/ci-pages.yml`,
    label: "GitHub Actions workflow",
  },
  {
    href: withBasePath("/coverage/"),
    label: "Coverage report",
  },
  {
    href: withBasePath("/docs/"),
    label: "TypeDoc docs",
  },
  {
    href: `${githubRepositoryUrl}#readme`,
    label: "README",
  },
] as const;

const qualityPillars = [
  {
    description:
      "La pipeline esegue format check, lint, typecheck, coverage, docs, build static export, report exposure, E2E e assert finali sull'output.",
    title: "CI/CD verificabile",
  },
  {
    description:
      "Le soglie Vitest sono bloccanti: statement 80%, branch 75%, function 80% e line 80%. Il report HTML viene pubblicato su GitHub Pages.",
    title: "Coverage gates",
  },
  {
    description:
      "I moduli di dominio sono documentati con TSDoc/JSDoc e TypeDoc genera una reference pubblica sotto /docs/.",
    title: "Documentazione tecnica",
  },
  {
    description:
      "Next.js esporta asset statici in out/, con immagini non ottimizzate server-side, trailing slash e base path compatibile con project Pages.",
    title: "GitHub Pages static export",
  },
  {
    description:
      "Il carrello usa semantica dialog, focus management, Escape close, overlay close, tab order prevedibile e annunci aria-live.",
    title: "Accessibilità interattiva",
  },
  {
    description:
      "Playwright copre i flussi shopper reali: catalogo, search, filtri, dark mode, dettaglio prodotto, carrello e checkout mock.",
    title: "E2E orientati al flusso",
  },
] as const;

const tradeOffs = [
  "Static export significa niente API routes, SSR runtime, Server Actions o segreti server-side.",
  "I dati prodotto sono locali per mantenere demo e CI deterministiche.",
  "Search, filtri, carrello e checkout mock restano client-side per rispettare GitHub Pages.",
  "Il checkout simula la forma di un'integrazione Stripe senza chiavi reali o chiamate backend.",
] as const;

export const metadata: Metadata = {
  description:
    "Quality dashboard for the Headless Commerce portfolio: CI/CD, coverage, TypeDoc, accessibility, static export trade-offs, and GitHub Pages constraints.",
  title: "Engineering Quality",
};

export default function EngineeringPage(): ReactNode {
  return (
    <>
      <section className="border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-emerald-800 dark:text-emerald-300">
              Engineering Quality
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-stone-950 sm:text-5xl dark:text-white">
              Qualità tecnica visibile, testabile e compatibile con GitHub Pages.
            </h1>
            <p className="mt-5 text-lg leading-8 text-stone-600 dark:text-stone-300">
              Questa pagina raccoglie le scelte tecniche che rendono il progetto più di una demo
              catalogo: export statico, report pubblici, test di flusso e accessibilità
              verificabile.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>Static Export</Badge>
            <Badge className="border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-700/70 dark:bg-sky-950 dark:text-sky-200">
              No Server Runtime
            </Badge>
            <Badge className="border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-700/70 dark:bg-amber-950 dark:text-amber-200">
              Coverage gated
            </Badge>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-stone-950 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:bg-emerald-400 dark:text-stone-950 dark:hover:bg-emerald-300"
              href="/"
            >
              Demo homepage
            </Link>
            {engineeringLinks.map((link) => (
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-stone-300 bg-white px-5 text-sm font-semibold text-stone-950 transition hover:border-emerald-700 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-100/70 dark:bg-stone-900/60" aria-labelledby="quality-pillars">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2
              className="text-3xl font-semibold text-stone-950 dark:text-white"
              id="quality-pillars"
            >
              Quality gates che parlano del prodotto.
            </h2>
            <p className="mt-4 text-stone-600 dark:text-stone-300">
              Ogni controllo è pensato per ridurre regressioni reali su UX, accessibilità,
              documentazione pubblica e compatibilità con Pages.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {qualityPillars.map((pillar) => (
              <article
                className="rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-950"
                key={pillar.title}
              >
                <h3 className="text-base font-semibold text-stone-950 dark:text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-stone-950" aria-labelledby="static-tradeoffs">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-800 dark:text-emerald-300">
              Static Commerce Architecture
            </p>
            <h2
              className="mt-2 text-3xl font-semibold text-stone-950 dark:text-white"
              id="static-tradeoffs"
            >
              Trade-off dichiarati invece di nascosti.
            </h2>
            <p className="mt-4 text-stone-600 dark:text-stone-300">
              Il progetto privilegia una superficie frontend solida e pubblicabile su GitHub Pages,
              quindi alcune scelte sono intenzionalmente statiche.
            </p>
          </div>
          <ul className="grid gap-4">
            {tradeOffs.map((tradeOff) => (
              <li
                className="rounded-lg border border-stone-200 bg-stone-50 p-5 text-sm font-medium leading-6 text-stone-800 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100"
                key={tradeOff}
              >
                {tradeOff}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
