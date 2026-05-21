import type { CartLineItem } from "@/lib/cart/cart-types";
import { withBasePath } from "@/lib/routing";

export type MockCheckoutStatus = "failure" | "success";

export interface MockCheckoutInput {
  readonly forceResult?: MockCheckoutStatus;
  readonly items: readonly CartLineItem[];
  readonly latencyMs?: number;
  readonly subtotalCents: number;
}

export interface MockCheckoutSession {
  readonly amountTotalCents: number;
  readonly checkoutUrl: string;
  readonly message: string;
  readonly sessionId: string;
  readonly status: MockCheckoutStatus;
}

function createStableSessionId(items: readonly CartLineItem[], subtotalCents: number): string {
  const seed = items.map((item) => `${item.product.slug}:${item.quantity}`).join("|");
  let hash = subtotalCents;

  for (const character of seed) {
    hash = (hash * 31 + character.charCodeAt(0)) % 1_000_000_007;
  }

  return `cs_mock_${hash.toString(36)}`;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

/**
 * Simulates Stripe Checkout session creation entirely in the browser.
 */
export async function createMockStripeCheckoutSession({
  forceResult,
  items,
  latencyMs = 350,
  subtotalCents,
}: MockCheckoutInput): Promise<MockCheckoutSession> {
  await wait(latencyMs);

  const shouldFail = forceResult === "failure" || items.length === 0 || subtotalCents <= 0;
  const status: MockCheckoutStatus = shouldFail ? "failure" : "success";
  const sessionId = createStableSessionId(items, subtotalCents);

  return {
    amountTotalCents: subtotalCents,
    checkoutUrl: `${withBasePath("/checkout/")}?session_id=${sessionId}&mock=stripe`,
    message:
      status === "success"
        ? "Sessione Stripe mock creata. Nessuna chiave reale e nessun pagamento inviato."
        : "Sessione mock non creata: controlla il carrello e riprova.",
    sessionId,
    status,
  };
}
