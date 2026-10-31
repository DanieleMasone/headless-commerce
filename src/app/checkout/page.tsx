import type { Metadata } from "next";
import type { ReactNode } from "react";

import { CheckoutClient } from "@/components/checkout/CheckoutClient";
import { withBasePath } from "@/lib/routing";

export const metadata: Metadata = {
  alternates: { canonical: withBasePath("/checkout/") },
  description: "Mock Stripe checkout fully compatible with static export.",
  title: "Checkout demo",
};

export default function CheckoutPage(): ReactNode {
  return <CheckoutClient />;
}
