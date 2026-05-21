import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cx } from "@/lib/format";

/**
 * Visual treatment for the shared button primitive.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost";

/**
 * Supported fixed button sizes.
 */
export type ButtonSize = "sm" | "md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly size?: ButtonSize;
  readonly variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  ghost:
    "bg-transparent text-stone-900 hover:bg-stone-100 focus-visible:outline-stone-950 dark:text-stone-100 dark:hover:bg-stone-800 dark:focus-visible:outline-emerald-400",
  primary:
    "bg-stone-950 text-white hover:bg-emerald-700 focus-visible:outline-emerald-700 disabled:bg-stone-300 dark:bg-emerald-400 dark:text-stone-950 dark:hover:bg-emerald-300 dark:disabled:bg-stone-700 dark:disabled:text-stone-300",
  secondary:
    "border border-stone-300 bg-white text-stone-950 hover:border-emerald-700 hover:text-emerald-800 focus-visible:outline-emerald-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-emerald-400 dark:hover:text-emerald-300",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-sm",
  sm: "min-h-11 px-3 text-sm",
};

/**
 * Shared button primitive for commerce actions.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, size = "md", type = "button", variant = "primary", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      type={type}
      {...props}
    />
  );
});
