# Headless Commerce

Enterprise-grade portfolio project for a static headless commerce frontend built with Next.js App Router, strict TypeScript, Tailwind CSS, Vitest, Playwright, TypeDoc, and GitHub Pages.

The app is intentionally frontend-only: product data is local, the cart is persisted in `localStorage`, and checkout simulates Stripe session creation in the browser without API routes, Server Actions, SSR runtime, or private keys.

## Why This Project Matters

Most portfolio commerce demos stop at a product grid. This project shows the parts that matter in production frontend work: fast catalog interactions, accessible cart behavior, static deployment constraints, repeatable CI, coverage gates, generated docs, and a clean modular architecture.

## Architecture Goals

- Static export compatible with GitHub Pages.
- Conversion-oriented catalog UX with cart drawer instead of a separate cart page.
- Local mock data that can later be replaced by a CMS or commerce API.
- Reducer-driven cart state with Context, no Redux or Zustand.
- Strict TypeScript boundaries across data, UI, cart, and checkout modules.
- CI that validates formatting, linting, types, coverage, E2E, docs, and export build.

## Tech Stack

- Next.js App Router with `output: "export"`.
- React and TypeScript strict mode.
- Tailwind CSS for responsive UI.
- Vitest and React Testing Library for unit/component tests.
- Playwright for E2E shopper flows.
- ESLint and Prettier for code quality.
- TypeDoc for generated API/component documentation.
- GitHub Actions and GitHub Pages for CI/CD.

## Features

- Homepage catalog with professional hero section, product grid, category filter, price filter, and sorting without page reloads.
- Static product detail route at `/product/[slug]` with `generateStaticParams` and per-product SEO metadata.
- Accessible cart drawer with focus handling, Escape support, add/remove, quantity changes, subtotal, and persistence.
- Mock Stripe checkout at `/checkout` with success and failure states, fully client-side.
- Empty states and loading skeletons for resilient UX.
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
npm run deploy:check
npm run ci
```

`npm run start` serves the already generated `out/` folder with a small local static server. It is not a production Node runtime requirement.

## Tests And Coverage

Coverage is generated in `coverage/` and enforces:

- statements >= 80
- branches >= 75
- functions >= 80
- lines >= 80

The suite covers the cart reducer, price formatter, product filtering, mock checkout, product card, filters, cart button, and cart drawer. Playwright covers the shopper path from catalog filtering through mock checkout.

## Documentation

TypeDoc generates API/component documentation in `docs/`:

```bash
npm run docs
```

Documented areas include the product model, cart reducer, cart provider, checkout mock, routing helpers, formatter utilities, and core UI/product/cart components. `docs/` is treated as generated output and uploaded as a CI artifact.

## CI/CD

`.github/workflows/ci-pages.yml` runs on pull requests and pushes to `master`:

1. Set up Node.js from `.node-version` (`24.15.0`).
2. Run `npm ci`.
3. Install Playwright Chromium dependencies.
4. Run `npm run ci`.
5. Upload coverage and docs artifacts.
6. Upload `out/` as the GitHub Pages artifact.
7. Deploy Pages only on pushes to `master`.

## Technical Decisions

- Context plus `useReducer` keeps cart state explicit, testable, and small.
- Product data stays in `src/data/products.ts` to keep the export deterministic.
- Public asset URLs pass through `withBasePath` so GitHub Pages project paths work.
- Checkout is a browser-only Stripe mock to avoid secret handling and server endpoints.
- No extra UI/state libraries are used; the requested stack is enough for this scope.

## Trade-Offs

- Static export means no runtime personalization, inventory freshness, server-side redirects, API routes, or optimized Next image server.
- Search/filtering runs client-side over a small local catalog; a larger catalog would need precomputed indexes or an external search service.
- The checkout does not create real Stripe sessions. It demonstrates integration shape and UX states only.

## Roadmap

- Add product search with local indexing.
- Add persisted coupon and shipping estimator mocks.
- Add visual regression checks for key responsive layouts.
- Add optional CMS adapter while preserving static export.
- Add analytics event contracts for cart and checkout funnels.

## License

Released under the MIT License. See [LICENSE](LICENSE).

Copyright (c) 2026 Daniele Masone.
