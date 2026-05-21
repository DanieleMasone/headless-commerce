import type { Metadata } from "next";
import type { ReactNode } from "react";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CartProvider } from "@/lib/cart/cart-store";
import { ThemeProvider } from "@/lib/theme/theme-store";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://headless-commerce.example";
const themeInitScript = `
(() => {
  try {
    const storedTheme = window.localStorage.getItem("headless-commerce-theme");
    const theme =
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "light";
  }
})();
`;

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
    <html data-scroll-behavior="smooth" lang="it" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <CartProvider>
            <a
              className="skip-link rounded-md bg-stone-950 px-4 py-2 text-sm font-semibold text-white dark:bg-emerald-400 dark:text-stone-950"
              href="#main-content"
            >
              Salta al contenuto
            </a>
            <SiteHeader />
            <main id="main-content">{children}</main>
            <SiteFooter />
            <CartDrawer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
