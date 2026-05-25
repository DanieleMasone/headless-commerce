# AGENTS.md

## Project Purpose

`headless-commerce` is an enterprise-grade frontend portfolio project for a static headless commerce experience. It demonstrates conversion-oriented ecommerce UX, accessible cart and checkout flows, local product data, test coverage, generated API documentation, and GitHub Pages deployment without a production Node.js server.

## Tech Stack

- Next.js App Router with static export
- React 19
- TypeScript strict mode
- Tailwind CSS 4
- Vitest and React Testing Library for unit and component tests
- Playwright for end-to-end tests
- ESLint and Prettier
- TypeDoc with TSDoc/JSDoc comments
- GitHub Actions and GitHub Pages

## Runtime and Package Manager

- Required Node.js version: `24.15.0` from `.node-version` and `package.json` engines.
- Package manager: npm.
- Install dependencies with `npm ci`.
- CI must use `npm ci`, not `npm install`, so `package.json` and `package-lock.json` must stay in sync.

## Development Commands

Use only scripts that exist in `package.json`:

- `npm run dev`: start the Next.js development server.
- `npm run build`: generate Next types, run the static Next.js build, and refresh prepared Next type stubs.
- `npm run start`: serve the exported static site locally from `out/`.
- `npm run lint`: run ESLint with zero warnings allowed.
- `npm run format`: format the repository with Prettier.
- `npm run format:check`: verify Prettier formatting.
- `npm run typecheck`: run Next type generation and `tsc --noEmit`.
- `npm run test`: run Vitest once.
- `npm run test:watch`: run Vitest in watch mode.
- `npm run test:coverage`: run Vitest with coverage gates and HTML report generation.
- `npm run test:e2e`: run Playwright E2E tests against the generated `out/` static export. Run `npx playwright install chromium` once and `npm run build` first when using it outside `npm run ci`.
- `npm run docs`: clean and generate TypeDoc HTML documentation into `docs/`.
- `npm run docs:clean`: remove generated TypeDoc output.
- `npm run expose:reports`: copy generated docs and coverage into `out/docs/` and `out/coverage/`.
- `npm run ci`: run format check, lint, typecheck, coverage tests, docs, build, report exposure, E2E tests, and static export assertions.
- `npm run deploy:check`: verify coverage, docs, static build, report exposure, and export integrity.

## Static Export Constraints

- Keep `output: "export"` in `next.config.ts`.
- Keep `images: { unoptimized: true }` because GitHub Pages cannot run the Next.js image optimization server.
- Keep `trailingSlash: true`.
- Keep support for `NEXT_PUBLIC_BASE_PATH=/headless-commerce` through `basePath` and `assetPrefix`.
- Do not add API routes, Server Actions, SSR runtime requirements, middleware that requires a server, or production-only Node.js dependencies.
- Product data must remain local to the repository.
- Checkout must remain a browser-only Stripe mock with no real keys and no server call.
- Public report links must remain navigable on GitHub Pages:
  - `/coverage/`
  - `/docs/`
- Use the existing base path helper for public assets, report links, and other URLs that must work under `https://danielemasone.github.io/headless-commerce/`.
- Product images referenced by data must exist under `public/products/`.
- Do not hardcode root-relative public URLs in a way that breaks project Pages deployment.

## Code Style

- Keep TypeScript strict and avoid `any`.
- Prefer explicit domain names over generic names.
- Keep components small, readable, and focused on one job.
- Prefer native React, Next.js, and TypeScript patterns already used in the repo.
- Avoid premature abstractions, unnecessary wrappers, and barrel files that do not reduce real complexity.
- Do not leave dead code, unused exports, unused CSS, stale tests, or unused public assets.
- Do not leave `console.log` or debugging code in application source or tests.
- Use comments sparingly. Add TSDoc/JSDoc only where it helps future maintainers understand public modules and domain contracts.

## UI/UX Rules

- Preserve a polished ecommerce experience on mobile, tablet, and desktop.
- Maintain at least AA-level contrast in light and dark themes.
- Use semantic HTML and clear heading hierarchy.
- Keep visible focus states obvious and consistent.
- Maintain keyboard navigation for header actions, filters, product links, cart drawer, and checkout.
- Cart drawer requirements:
  - accessible dialog semantics
  - `aria-modal`
  - focus management
  - Escape-to-close
  - overlay click close
  - logical tab order
  - live announcement for cart updates
- Theme switch requirements:
  - persist explicit user choice in `localStorage`
  - respect `prefers-color-scheme` when no explicit choice exists
  - avoid hydration mismatches
  - expose a correct accessible state with `aria-pressed` or equivalent semantics
  - label must describe the next action, not the current state. If the current theme is dark, the label is "Attiva tema chiaro"; if the current theme is light, the label is "Attiva tema scuro".
- Keep product cards, filters, checkout, report links, and footer usable at narrow widths without horizontal overflow.
- Keep mobile hit targets at least 44px where controls are interactive.

## Testing Rules

- Update tests whenever behavior changes.
- Prefer semantic tests that assert user-visible behavior over fragile implementation details.
- Maintain coverage gates:
  - statements >= 80
  - branches >= 75
  - functions >= 80
  - lines >= 80
- Unit and component tests should cover:
  - cart reducer behavior
  - cart persistence
  - price formatting
  - product search, filters, sorting, and data integrity
  - checkout mock behavior
  - base path routing helper
  - dark mode initial state and toggle label
  - cart drawer accessibility behavior
  - product and cart UI interactions
- Playwright tests should cover real user flows:
  - homepage visit
  - product filtering and search
  - product detail navigation
  - add to cart
  - cart drawer quantity updates
  - mock checkout
  - dark mode toggle
  - public docs and coverage links
- Do not lower coverage gates or remove meaningful tests to make CI pass.

## Documentation Rules

- Use TSDoc/JSDoc for meaningful public modules and domain APIs only.
- Keep documentation focused on real APIs such as product model, cart types, cart reducer, cart provider/hooks, checkout mock, price formatter, routing/basePath helper, and public component props where useful.
- Do not document trivial components just to inflate generated docs.
- TypeDoc must generate public HTML documentation into `docs/`.
- `coverage/` and `docs/` must be published on GitHub Pages, not only uploaded as CI artifacts.
- `npm run expose:reports` must ensure generated reports are included in `out/coverage/` and `out/docs/`.
- Do not manually edit generated `docs/`, `coverage/`, or `out/` content unless the task explicitly targets generated output.

## CI/CD Rules

- `npm run ci` must pass before considering code changes complete.
- For documentation-only changes, run at least `npm run format:check`; run broader checks when the change could affect build, tests, docs, or deployment.
- GitHub Actions must set up Node.js from `.node-version`.
- GitHub Pages deployment must upload `out/`.
- Coverage and docs must be copied into `out/` before the Pages artifact is uploaded.
- Do not change the Pages workflow without verifying the static export output and report paths.
- The deployment branch is the repository default branch, currently `master`; the workflow also watches `main` for portability.
- Keep workflow permissions scoped to:
  - `contents: read`
  - `pages: write`
  - `id-token: write`
- Keep Pages concurrency configured to avoid overlapping deployments.

## Dependency Policy

- Do not add dependencies without a clear technical reason.
- Prefer native React, Next.js, TypeScript, browser, and existing project utilities.
- Add a dependency only when it reduces real complexity, improves measurable quality, or provides a well-tested capability that would be risky to maintain locally.
- Explain every new dependency in the change summary and ensure `package-lock.json` is updated.
- Before adding UI, state, data, testing, accessibility, or build tooling packages, check whether the current stack already solves the problem cleanly.

## Technology Freshness Policy

- When a task concerns libraries, frameworks, GitHub Actions, Next.js, testing, accessibility tooling, package manager behavior, or Codex configuration, check current official documentation before proposing changes.
- Do not assume previous technical choices are still optimal.
- Evaluate upgrades and modern alternatives, but do not apply them automatically.
- Any upgrade must preserve GitHub Pages static export compatibility, strict TypeScript, coverage gates, public docs/coverage, and CI reliability.

## Cleanup Policy

- Remove unused files, components, utilities, assets, tests, generated references, and stale documentation when they are clearly obsolete.
- Do not keep broken public paths or unlinked reports.
- Do not keep placeholder product content, duplicated product slugs, missing product images, or product fields that are not rendered or tested.
- Keep generated directories out of manual edits:
  - `.next/`
  - `out/`
  - `coverage/`
  - `docs/`
  - `playwright-report/`
  - `test-results/`
  - `node_modules/`
- Preserve useful architecture that supports testability, accessibility, static export, or GitHub Pages deployment.

## Definition of Done

For code changes, the task is done only when:

- formatting passes with `npm run format:check`
- lint passes with `npm run lint`
- TypeScript passes with `npm run typecheck`
- unit and component coverage passes with `npm run test:coverage`
- E2E tests pass with `npm run test:e2e`
- TypeDoc generation passes with `npm run docs`
- static export build passes with `npm run build`
- public reports are exposed with `npm run expose:reports`
- static export output is asserted with `node scripts/assert-static-export.mjs`
- `npm run ci` passes when the change affects application code, tests, docs generation, build, or deployment
- homepage, product detail, checkout, `/coverage/`, and `/docs/` links remain valid under `NEXT_PUBLIC_BASE_PATH=/headless-commerce`
- no server runtime, API route, Server Action, or GitHub Pages regression has been introduced
