import type { Metadata } from "next";
import type { ReactNode } from "react";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CartProvider } from "@/lib/cart/cart-store";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://headless-commerce.example";

export const metadata: Metadata = {
  description:
    "Static headless commerce portfolio with conversion-oriented UX, local mock data, cart drawer, and mock Stripe checkout.",
  metadataBase: new URL(siteUrl),
  title: {
    default: "Headless Commerce",
    template: "%s | Headless Commerce",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <html data-scroll-behavior="smooth" lang="it">
      <body>
        <CartProvider>
          <a
            className="skip-link rounded-md bg-stone-950 px-4 py-2 text-sm font-semibold text-white"
            href="#main-content"
          >
            Salta al contenuto
          </a>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
