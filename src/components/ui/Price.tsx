import type { ReactNode } from "react";

import { cx, formatPrice } from "@/lib/format";

export interface PriceProps {
  readonly amountCents: number;
  readonly className?: string;
  readonly compareAtCents?: number;
}

export function Price({ amountCents, className, compareAtCents }: PriceProps): ReactNode {
  return (
    <span className={cx("inline-flex items-baseline gap-2", className)}>
      <span>{formatPrice(amountCents)}</span>
      {compareAtCents ? (
        <span className="text-sm font-medium text-stone-500 line-through">
          {formatPrice(compareAtCents)}
        </span>
      ) : null}
    </span>
  );
}
