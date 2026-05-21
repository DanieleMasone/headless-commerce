# Headless Commerce

[![CI and GitHub Pages](https://github.com/danielemasone/headless-commerce/actions/workflows/ci-pages.yml/badge.svg?branch=master)](https://github.com/danielemasone/headless-commerce/actions/workflows/ci-pages.yml)
![Coverage gated](https://img.shields.io/badge/coverage-gated%2080%25%2B-0f766e)

Enterprise-grade portfolio project for a static headless commerce frontend built with Next.js App Router, strict TypeScript, Tailwind CSS, Vitest, Playwright, TypeDoc, and GitHub Pages.

The app is intentionally frontend-only: product data is local, the cart is persisted in `localStorage`, checkout simulates Stripe session creation in the browser, and the production deploy does not require API routes, Server Actions, SSR runtime, or private keys.

## Live Links

- Demo: [danielemasone.github.io/headless-commerce](https://danielemasone.github.io/headless-commerce/)
- Coverage report: [danielemasone.github.io/headless-commerce/coverage](https://danielemasone.github.io/headless-commerce/coverage/)
- TypeDoc documentation: [danielemasone.github.io/headless-commerce/docs](https://danielemasone.github.io/headless-commerce/docs/)

## Why This Project Matters

Most portfolio commerce demos stop at a product grid. This project shows the parts that matter in production frontend work: fast catalog interactions, accessible cart behavior, static deployment constraints, repeatable CI, coverage gates, public generated docs, and a clean modular architecture.

## Architecture Goals

- Static export compatible with GitHub Pages.
- Conversion-oriented catalog UX with search, filters, and a cart drawer instead of a separate cart page.
- Local mock data that can later be replaced by a CMS or commerce API.
- Reducer-driven cart state with Context, no Redux or Zustand.
- Strict TypeScript boundaries across data, UI, cart, checkout, routing, and theme modules.
- CI that validates formatting, linting, types, coverage, E2E, docs, static export, and public report exposure.

## Tech Stack

- Next.js App Router with `output: "export"`.
- React and TypeScript strict mode.
- Tailwind CSS for responsive light and dark themes.
- Vitest and React Testing Library for unit/component tests.
- Playwright for E2E shopper flows.
- ESLint and Prettier for code quality.
- TypeDoc for generated API/component documentation.
- GitHub Actions and GitHub Pages for CI/CD.

## Features

- Homepage catalog with premium hero, product grid, client-side search, category filter, price filter, sorting, reset filters, and readable result counts.
- Static product detail route at `/product/[slug]` with `generateStaticParams` and per-product SEO metadata.
- Accessible cart drawer with `aria-modal`, focus management, Escape close, overlay close, quantity changes, subtotal, `aria-live` updates, and persistence.
- Dark mode with persisted toggle and `prefers-color-scheme` fallback.
- Mock Stripe checkout at `/checkout` with success and failure states, fully client-side.
- Public Coverage and Docs links in the deployed site header/footer.
- Base path aware public assets for `https://<user>.github.io/<repo>/` deployments.

## GitHub Pages And Static Export

`next.config.ts` is configured with:

- `output: "export"` so `next build` produces `out/`.
- `images: { unoptimized: true }` because GitHub Pages has no Next image optimization server.
- `trailingSlash: true` for static route compatibility.
- optional `basePath` and `assetPrefix` from `NEXT_PUBLIC_BASE_PATH`.

For project pages, set:

```bash
NEXT_PUBLIC_BASE_PATH=/headless-commerce
```

For user or organization pages published at the root domain, leave it empty.

## Local Commands

```bash
npm ci
npm run dev
npm run build
npm run start
npm run lint
npm run format
npm run format:check
npm run typecheck
npm run test
npm run test:watch
npm run test:coverage
npm run test:e2e
npm run docs
npm run docs:clean
npm run expose:reports
npm run deploy:check
npm run ci
```

`npm run start` serves the already generated `out/` folder with a small local static server. It is not a production Node runtime requirement.

## Test Strategy And Coverage Gates

Vitest coverage is generated in `coverage/` and enforces:

- statements >= 80
- branches >= 75
- functions >= 80
- lines >= 80

The suite covers the cart reducer, cart persistence, price formatter, routing helpers, product search/filter/sort, dark mode toggle, mock checkout, ProductCard, ProductFilters, CartButton, and CartDrawer. Playwright covers the shopper path from homepage search and filtering through cart quantity changes and mock checkout.

After `npm run ci`, the HTML coverage report is copied into `out/coverage/`, so it is published publicly with the GitHub Pages site.

## Documentation

TypeDoc generates API/component documentation in `docs/`:

```bash
npm run docs
```

Documented areas include the product model, cart types, cart reducer, cart provider/hooks, checkout mock, routing/basePath helpers, formatter utilities, ProductFilters props, and CartDrawer props.

After `npm run ci`, generated documentation is copied into `out/docs/`, so it is published publicly with the GitHub Pages site.

## CI/CD

`.github/workflows/ci-pages.yml` runs on pull requests and pushes to `master` or `main`, then deploys only when the push targets the repository default branch.

Pipeline:

1. Check out the repository.
2. Configure GitHub Pages for deployable pushes.
3. Set up Node.js from `.node-version` (`24.15.0`).
4. Run `npm ci`.
5. Install Playwright Chromium and system dependencies.
6. Run `npm run ci`.
7. Upload coverage and docs artifacts for inspection.
8. Upload `out/` as the GitHub Pages artifact.
9. Deploy with `actions/deploy-pages`.

`npm run ci` runs:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test:coverage
npm run test:e2e
npm run docs
npm run build
npm run expose:reports
```

## Technical Decisions

- Context plus `useReducer` keeps cart state explicit, testable, and small.
- Product data stays in `src/data/products.ts` to keep the export deterministic.
- Public asset and report URLs pass through `withBasePath` so GitHub Pages project paths work.
- Checkout is a browser-only Stripe mock to avoid secret handling and server endpoints.
- No extra UI/state libraries are used; the requested stack is enough for this scope.
- Dark mode is implemented with a small local provider instead of adding a theme dependency.

## Trade-Offs

- Static export means no runtime personalization, inventory freshness, server-side redirects, API routes, or optimized Next image server.
- Search/filtering runs client-side over a small local catalog; a larger catalog would need precomputed indexes or an external search service.
- The checkout does not create real Stripe sessions. It demonstrates integration shape and UX states only.
- Generated `docs/` and `coverage/` are not committed. They are created in CI and copied into `out/` for Pages deployment.

## Roadmap

- Add persisted coupon and shipping estimator mocks.
- Add visual regression checks for key responsive layouts.
- Add optional CMS adapter while preserving static export.
- Add analytics event contracts for cart and checkout funnels.
- Add product comparison and recently viewed modules.

## License

Released under the MIT License. See [LICENSE](LICENSE).

Copyright (c) 2026 Daniele Masone.
