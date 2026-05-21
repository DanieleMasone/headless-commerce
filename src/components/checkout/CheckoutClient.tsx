"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { useCart } from "@/lib/cart/cart-store";
import {
  createMockStripeCheckoutSession,
  type MockCheckoutSession,
  type MockCheckoutStatus,
} from "@/lib/checkout/stripe-mock";

type CheckoutState = "idle" | "loading";

export function CheckoutClient(): ReactNode {
  const { clearCart, items, subtotalCents } = useCart();
  const [checkoutState, setCheckoutState] = useState<CheckoutState>("idle");
  const [session, setSession] = useState<MockCheckoutSession | null>(null);

  async function handleCheckout(forceResult?: MockCheckoutStatus): Promise<void> {
    setCheckoutState("loading");
    const nextSession = await createMockStripeCheckoutSession({
      forceResult,
      items,
      subtotalCents,
    });
    setSession(nextSession);
    setCheckoutState("idle");

    if (nextSession.status === "success") {
      clearCart();
    }
  }

  if (items.length === 0 && !session) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-semibold text-stone-950">Il carrello è vuoto</h1>
        <p className="mt-4 text-stone-600">
          Il checkout demo parte solo da prodotti locali aggiunti al drawer carrello.
        </p>
        <Link
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md border border-stone-300 bg-white px-5 text-sm font-semibold text-stone-950 transition hover:border-emerald-700 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          href="/"
        >
          Torna al catalogo
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
      <div>
        <p className="text-sm font-semibold uppercase text-emerald-800">Checkout mock</p>
        <h1 className="mt-2 text-4xl font-semibold text-stone-950">Sessione Stripe simulata</h1>
        <p className="mt-4 max-w-2xl text-stone-600">
          La pagina non invia dati a Stripe e non richiede chiavi private. La sessione viene
          generata nel browser per preservare la compatibilità con static export.
        </p>

        {session ? (
          <div className="mt-8 rounded-lg border border-stone-200 bg-white p-5" role="status">
            <h2 className="text-xl font-semibold text-stone-950">
              {session.status === "success" ? "Checkout demo completato" : "Checkout demo fallito"}
            </h2>
            <p className="mt-3 text-stone-600">{session.message}</p>
            <dl className="mt-5 grid gap-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-stone-500">Session ID</dt>
                <dd className="font-mono text-stone-950">{session.sessionId}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-stone-500">Totale</dt>
                <dd className="font-semibold text-stone-950">
                  <Price amountCents={session.amountTotalCents} />
                </dd>
              </div>
            </dl>
          </div>
        ) : null}
      </div>

      <aside className="h-fit rounded-lg border border-stone-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-stone-950">Riepilogo ordine</h2>
        <div className="mt-5 space-y-4">
          {items.map((item) => (
            <div className="flex items-start justify-between gap-4 text-sm" key={item.product.slug}>
              <div>
                <p className="font-semibold text-stone-950">{item.product.name}</p>
                <p className="text-stone-500">Quantità {item.quantity}</p>
              </div>
              <Price
                amountCents={item.product.priceCents * item.quantity}
                className="font-semibold"
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-5 text-base font-semibold">
          <span>Totale</span>
          <Price amountCents={subtotalCents} />
        </div>
        <div className="mt-6 space-y-3">
          <Button
            className="w-full"
            disabled={checkoutState === "loading"}
            onClick={() => void handleCheckout("success")}
          >
            {checkoutState === "loading" ? "Creazione sessione..." : "Paga in modalità demo"}
          </Button>
          <Button
            className="w-full"
            disabled={checkoutState === "loading"}
            onClick={() => void handleCheckout("failure")}
            variant="secondary"
          >
            Simula errore
          </Button>
        </div>
      </aside>
    </section>
  );
}
