import type { ReactNode } from "react";

export function ProductGridSkeleton(): ReactNode {
  return (
    <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          aria-hidden="true"
          className="h-80 animate-pulse rounded-lg border border-stone-200 bg-stone-100"
          key={index}
        />
      ))}
    </div>
  );
}
