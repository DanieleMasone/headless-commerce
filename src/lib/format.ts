const euroFormatter = new Intl.NumberFormat("it-IT", {
  currency: "EUR",
  style: "currency",
});

export type ClassNameValue = false | null | string | undefined;

/**
 * Formats an integer cent amount for shopper-facing prices.
 */
export function formatPrice(amountCents: number): string {
  if (!Number.isFinite(amountCents)) {
    throw new TypeError("Price amount must be a finite number of cents.");
  }

  return euroFormatter.format(amountCents / 100);
}

/**
 * Small dependency-free class name combiner for UI components.
 */
export function cx(...classes: readonly ClassNameValue[]): string {
  return classes.filter(Boolean).join(" ");
}
