# Headless Commerce

Modern headless e-commerce prototype built with Next.js, TypeScript and a custom cart experience.

This project is not a Shopify clone. The goal is to demonstrate product UX, cart state management, performance-aware rendering and a checkout-ready architecture.

## Features

- Product catalog with fast client-side filters
- Product detail pages
- Cart drawer instead of a traditional cart page
- Global cart state with React Context and reducer
- Mock Stripe checkout flow
- Optimized product images with Next.js Image
- Responsive UI
- SEO-ready product pages
- Clean project architecture for future CMS or payment integration

## Tech Stack

- Next.js App Router
- React
- TypeScript
- CSS Modules / Tailwind CSS
- Next.js Image Optimization
- Mock Stripe checkout
- npm
- Node.js v24.15.0

## Project Structure

```txt
src/
  app/
    page.tsx
    product/[slug]/page.tsx
    checkout/page.tsx
    layout.tsx
    globals.css
  components/
    cart/
    product/
    ui/
  data/
    products.ts
  lib/
    cart-store.tsx
    format.ts
    stripe-mock.ts
  types/
    product.ts
public/
  products/
```

Getting Started
Install dependencies:
npm install
Run the development server:
npm run dev
Open:
http://localhost:3000
Build for production:
npm run build
Start production server:
npm run start
Main UX Decisions
Cart drawer
The cart opens as a drawer instead of navigating to a separate cart page.
This keeps the user in the shopping flow and reduces friction before checkout.
Fast filters
Product filters update instantly without a page reload.
This improves browsing speed and makes the catalog feel more responsive.
Mock checkout
Stripe is mocked intentionally.
The architecture keeps checkout isolated so a real Stripe integration can be added later without rewriting the cart or product flow.
Performance Notes


Product images use Next.js image optimization.


Product pages are server-rendered.


Filtering happens on the client to avoid unnecessary navigation.


The cart state is kept lightweight and local to the app.


Future Improvements


Real Stripe Checkout integration


CMS integration with Sanity, Contentful or Payload


Product search


Wishlist


User accounts


Order history


Inventory handling


Analytics events for add-to-cart and checkout conversion


Why this project exists
This project is designed as a portfolio-level frontend case study.
It focuses on the parts of e-commerce that matter in real products:


conversion-oriented UX


state management


performance


maintainable component architecture


clean checkout flow


---## Ordine corretto di sviluppo1. **Homepage statica**2. **Dati prodotti mock**3. **Product card**4. **Product grid**5. **Filtri**6. **Pagina dettaglio prodotto**7. **Cart context**8. **Cart drawer**9. **Checkout mock**10. **Responsive polish**11. **README**12. **Deploy**Non partire da Stripe. Sarebbe una perdita di tempo. Prima fai vedere che sai costruire un’esperienza d’acquisto solida.
