import { describe, expect, it } from "vitest";

import { products } from "@/data/products";
import { filterProducts, getMaxCatalogPrice } from "@/lib/products/filter-products";

describe("filterProducts", () => {
  it("filters by category and max price", () => {
    const result = filterProducts(products, {
      category: "Workspace",
      maxPriceCents: 10000,
      sort: "featured",
    });

    expect(result.map((product) => product.slug)).toEqual(["orbit-charging-mat"]);
  });

  it("sorts by descending price", () => {
    const result = filterProducts(products, {
      category: "all",
      maxPriceCents: getMaxCatalogPrice(products),
      sort: "price-desc",
    });

    expect(result[0]?.slug).toBe("nomad-smart-carry-on");
  });

  it("sorts by ascending price and name", () => {
    const byPrice = filterProducts(products, {
      category: "all",
      maxPriceCents: getMaxCatalogPrice(products),
      sort: "price-asc",
    });
    const byName = filterProducts(products, {
      category: "all",
      maxPriceCents: getMaxCatalogPrice(products),
      sort: "name-asc",
    });

    expect(byPrice[0]?.slug).toBe("drift-weekly-planner");
    expect(byName[0]?.slug).toBe("apex-commuter-pack");
  });
});
