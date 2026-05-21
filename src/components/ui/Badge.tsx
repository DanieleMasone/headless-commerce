import type { ReactNode } from "react";

import { cx } from "@/lib/format";

export interface BadgeProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function Badge({ children, className }: BadgeProps): ReactNode {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-900 dark:border-emerald-700/70 dark:bg-emerald-950 dark:text-emerald-200",
        className,
      )}
    >
      {children}
    </span>
  );
}
