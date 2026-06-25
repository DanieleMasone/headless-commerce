import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { withBasePath } from "@/lib/routing";

const githubRepositoryUrl =
  process.env.NEXT_PUBLIC_GITHUB_REPO_URL ?? "https://github.com/danielemasone/headless-commerce";

const guideLinks = [
  {
    href: "/",
    label: "Demo homepage",
    type: "internal",
  },
  {
    href: "/engineering",
    label: "Engineering",
    type: "internal",
  },
  {
    href: withBasePath("/coverage/"),
    label: "Coverage report",
    type: "external",
  },
  {
    href: withBasePath("/docs/"),
    label: "TypeDoc docs",
    type: "external",
  },
  {
    href: githubRepositoryUrl,
    label: "GitHub repository",
    type: "external",
  },
] as const;

const guideSections = [
  {
    body: "La homepage combina hero, catalogo e segnali di qualità. Il catalogo è locale e statico, ma l'interazione è client-side: search, filtri, ordinamento e reset non ricaricano la pagina.",
    title: "Catalogo e discovery",
  },
  {
    body: "Ogni prodotto ha una route statica generata da slug, immagini locali, prezzo formattato in euro, descrizione, feature principali e CTA contestuale per aggiungerlo al carrello.",
    title: "Product detail",
  },
  {
    body: "Il carrello è un drawer laterale persistito in localStorage. Supporta apertura da CTA e header, Escape close, overlay close, focus management, quantità, rimozione e subtotale.",
    title: "Cart drawer",
  },
  {
    body: "La pagina checkout simula una sessione Stripe nel browser. Non usa chiavi reali, API route o chiamate server: mostra solo il comportamento frontend atteso.",
    title: "Checkout mock",
  },
  {
    body: "Il theme switch persiste la preferenza esplicita e usa prefers-color-scheme quando l'utente non ha scelto. La label descrive sempre l'azione futura.",
    title: "Dark mode",
  },
  {
    body: "Engineering documenta qualità tecnica e trade-off, Coverage mostra il report Vitest, Docs espone la reference TypeDoc generata, GitHub porta al codice sorgente.",
    title: "Link pubblici",
  },
] as const;

const intentionalLimits = [
  "Dati prodotto locali e versionati nel repository.",
  "Nessun backend, API route, Server Action o runtime Node in produzione.",
  "Nessuna sessione Stripe reale e nessuna gestione segreti.",
  "Nessun inventario live, pricing remoto o personalizzazione runtime.",
  "Search e filtri sono client-side perché il catalogo mock è piccolo e deterministico.",
] as const;

export const metadata: Metadata = {
  description:
    "User guide for the Headless Commerce portfolio: catalog, product detail, cart drawer, mock checkout, dark mode, public reports, and static limitations.",
  title: "User Guide",
};

export default function GuidePage(): ReactNode {
  return (
    <>
      <section className="border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-emerald-800 dark:text-emerald-300">
              User Guide
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-stone-950 sm:text-5xl dark:text-white">
              Come leggere e usare la demo commerce.
            </h1>
            <p className="mt-5 text-lg leading-8 text-stone-600 dark:text-stone-300">
              Questa guida separa il comportamento utente dalla documentazione tecnica: spiega cosa
              provare nel sito, cosa è mockato e quali limiti sono intenzionali per mantenere la
              compatibilità con GitHub Pages.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>Client-side UX</Badge>
            <Badge className="border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-700/70 dark:bg-sky-950 dark:text-sky-200">
              Mock checkout
            </Badge>
            <Badge className="border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-700/70 dark:bg-amber-950 dark:text-amber-200">
              Local product data
            </Badge>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {guideLinks.map((link) =>
              link.type === "internal" ? (
                <Link
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-stone-950 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:bg-emerald-400 dark:text-stone-950 dark:hover:bg-emerald-300"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-stone-300 bg-white px-5 text-sm font-semibold text-stone-950 transition hover:border-emerald-700 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </a>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="bg-stone-100/70 dark:bg-stone-900/60" aria-labelledby="guide-flows">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-stone-950 dark:text-white" id="guide-flows">
              Flussi principali.
            </h2>
            <p className="mt-4 text-stone-600 dark:text-stone-300">
              La demo è pensata per mostrare un percorso shopper completo senza server runtime:
              scoperta prodotto, decisione, carrello e checkout simulato.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {guideSections.map((section) => (
              <article
                className="rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-950"
                key={section.title}
              >
                <h3 className="text-base font-semibold text-stone-950 dark:text-white">
                  {section.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">
                  {section.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-stone-950" aria-labelledby="intentional-limits">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-800 dark:text-emerald-300">
              Static by design
            </p>
            <h2
              className="mt-2 text-3xl font-semibold text-stone-950 dark:text-white"
              id="intentional-limits"
            >
              Cosa è intenzionalmente mockato.
            </h2>
            <p className="mt-4 text-stone-600 dark:text-stone-300">
              Questi limiti non sono funzionalità mancanti: rendono il progetto stabile,
              ispezionabile e pubblicabile come static export.
            </p>
          </div>
          <ul className="grid gap-4">
            {intentionalLimits.map((limit) => (
              <li
                className="rounded-lg border border-stone-200 bg-stone-50 p-5 text-sm font-medium leading-6 text-stone-800 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100"
                key={limit}
              >
                {limit}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
