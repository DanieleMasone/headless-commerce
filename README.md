# Headless Commerce

[![CI and GitHub Pages](https://github.com/danielemasone/headless-commerce/actions/workflows/ci-pages.yml/badge.svg?branch=master)](https://github.com/danielemasone/headless-commerce/actions/workflows/ci-pages.yml)
![Coverage gated](https://img.shields.io/badge/coverage-gated%2080%25%2B-0f766e)

Static headless commerce frontend built with **Next.js App Router**, **strict TypeScript**, **Tailwind CSS**, **Vitest**, **Playwright**, **TypeDoc**, and **GitHub Pages**.

The project is intentionally frontend-only: product data is local, cart state is persisted in `localStorage`, checkout is simulated in the browser, and the production deployment requires no server runtime.

## Live

- Demo: https://danielemasone.github.io/headless-commerce/
- Coverage: https://danielemasone.github.io/headless-commerce/coverage/
- Docs: https://danielemasone.github.io/headless-commerce/docs/

## Why This Project Exists

Most portfolio commerce demos stop at a product grid. This project focuses on the parts that matter in real frontend work:

- conversion-oriented catalog UX
- accessible cart interaction
- static deployment constraints
- predictable state management
- automated tests and coverage gates
- generated technical documentation
- CI/CD suitable for a public portfolio project

## Features

- Product catalog with search, filters, sorting, reset state, and result count.
- Static product detail pages generated from local product data.
- Accessible cart drawer with keyboard support, focus management, overlay close, Escape close, quantity controls, subtotal, and `aria-live` updates.
- Dark mode with persisted user preference and `prefers-color-scheme` fallback.
- Mock checkout flow with success and failure states.
- Public coverage and TypeDoc documentation published with GitHub Pages.
- Base path aware routing and assets for project-page deployment.

## Tech Stack

- Next.js App Router with static export
- React
- TypeScript strict mode
- Tailwind CSS
- Vitest
- React Testing Library
- Playwright
- TypeDoc
- ESLint
- Prettier
- GitHub Actions
- GitHub Pages

## Static Export Constraints

The app is designed for GitHub Pages and uses:

- `output: "export"`
- `images: { unoptimized: true }`
- `trailingSlash: true`
- optional `basePath` and `assetPrefix` from `NEXT_PUBLIC_BASE_PATH`

For this repository deployment:

```bash
NEXT_PUBLIC_BASE_PATH=/headless-commerce
```

Because the app is statically exported, it does not use:

- API routes
- Server Actions
- SSR runtime
- private server-side secrets
- Next.js image optimization server

## Getting Started

```bash
npm ci
npm run dev
```

Build the static site:

```bash
npm run build
```

Run the full validation pipeline:

```bash
npm run ci
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development |
| `npm run build` | Build the static export |
| `npm run start` | Serve the generated `out/` folder locally |
| `npm run lint` | Run ESLint |
| `npm run format:check` | Check formatting |
| `npm run typecheck` | Run TypeScript validation |
| `npm run test` | Run unit/component tests |
| `npm run test:coverage` | Run tests with coverage |
| `npm run test:e2e` | Run Playwright tests |
| `npm run docs` | Generate TypeDoc documentation |
| `npm run expose:reports` | Copy docs and coverage into `out/` |
| `npm run ci` | Run the complete CI validation flow |

## Quality Gates

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

Coverage thresholds:

| Metric | Minimum |
|---|---:|
| Statements | 80% |
| Branches | 75% |
| Functions | 80% |
| Lines | 80% |

The test suite covers cart state, cart persistence, formatting utilities, routing helpers, product search/filter/sort, dark mode behavior, checkout mock, product cards, filters, cart controls, and the cart drawer.

## Documentation

TypeDoc generates technical documentation in `docs/`:

```bash
npm run docs
```

During CI, documentation is copied into:

```txt
out/docs/
```

Coverage is copied into:

```txt
out/coverage/
```

Both are deployed publicly with the GitHub Pages artifact.

## Architecture Notes

- Product data lives in `src/data/products.ts` to keep the static export deterministic.
- Cart state uses React Context plus `useReducer` for explicit and testable state transitions.
- Checkout is a browser-only Stripe-style mock to avoid server endpoints and secret handling.
- Public URLs use base-path-aware helpers so the app works under `/headless-commerce/`.
- Dark mode is implemented locally instead of adding a theme library.
- UI/state dependencies are intentionally minimal.

## Trade-Offs

- Static export prevents runtime personalization, live inventory, API routes, server redirects, and server-side image optimization.
- Client-side search and filtering are appropriate for a small local catalog.
- Checkout demonstrates frontend integration shape only.

## License

Released under the MIT License. See [LICENSE](LICENSE).

Copyright (c) 2026 Daniele Masone.