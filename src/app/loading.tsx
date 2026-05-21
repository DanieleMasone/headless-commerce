import type { ReactNode } from "react";

import { ProductGridSkeleton } from "@/components/product/ProductGridSkeleton";

export default function Loading(): ReactNode {
  return <ProductGridSkeleton />;
}
