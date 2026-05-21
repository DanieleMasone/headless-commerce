import type { Metadata } from "next";
import type { ReactNode } from "react";

import { CheckoutClient } from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  description: "Mock Stripe checkout fully compatible with static export.",
  title: "Checkout demo",
};

export default function CheckoutPage(): ReactNode {
  return <CheckoutClient />;
}
