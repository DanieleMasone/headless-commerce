import type { Product, ProductCategory } from "@/types/product";

export const productCategories = [
  "Workspace",
  "Audio",
  "Travel",
  "Lifestyle",
] as const satisfies readonly ProductCategory[];

export const products = [
  {
    slug: "atlas-modular-desk-kit",
    name: "Atlas Modular Desk Kit",
    category: "Workspace",
    priceCents: 24900,
    compareAtPriceCents: 29900,
    imagePath: "/products/atlas-desk-kit.png",
    gallery: ["/products/atlas-desk-kit.png", "/products/luma-task-lamp.png"],
    tagline: "A premium command center for focused operators.",
    description:
      "A modular desk kit with a matte organizer rail, magnetic cable routing, and a low-profile charging shelf for high-output workdays.",
    features: ["Magnetic cable rail", "Anodized aluminum tray", "Qi-ready shelf"],
    rating: 4.9,
    reviewCount: 128,
    featuredRank: 1,
  },
  {
    slug: "pulse-anc-focus-headset",
    name: "Pulse ANC Focus Headset",
    category: "Audio",
    priceCents: 18900,
    imagePath: "/products/pulse-headset.png",
    gallery: ["/products/pulse-headset.png", "/products/orbit-charging-mat.png"],
    tagline: "Quiet, balanced audio for deep work and travel.",
    description:
      "Hybrid active noise cancellation, beamforming microphones, and soft-touch controls tuned for work calls and long listening sessions.",
    features: ["42-hour battery", "Hybrid ANC", "Dual-device pairing"],
    rating: 4.8,
    reviewCount: 94,
    featuredRank: 2,
  },
  {
    slug: "nomad-smart-carry-on",
    name: "Nomad Smart Carry-On",
    category: "Travel",
    priceCents: 32900,
    compareAtPriceCents: 36900,
    imagePath: "/products/nomad-carry-on.png",
    gallery: ["/products/nomad-carry-on.png", "/products/apex-commuter-pack.png"],
    tagline: "A carry-on built around fast-moving product teams.",
    description:
      "A lightweight shell, removable tech pod, and location-ready ID plate keep business travel organized without looking overbuilt.",
    features: ["Removable tech pod", "Silent spinner wheels", "Recycled polycarbonate"],
    rating: 4.7,
    reviewCount: 61,
    featuredRank: 3,
  },
  {
    slug: "luma-task-lamp",
    name: "Luma Task Lamp",
    category: "Workspace",
    priceCents: 11900,
    imagePath: "/products/luma-task-lamp.png",
    gallery: ["/products/luma-task-lamp.png", "/products/atlas-desk-kit.png"],
    tagline: "Glare-managed light for late launches.",
    description:
      "A compact aluminum desk lamp with warm-to-cool dimming, memory presets, and a weighted base that stays planted.",
    features: ["Five dimming levels", "Warm-to-cool range", "Memory preset"],
    rating: 4.6,
    reviewCount: 77,
    featuredRank: 5,
  },
  {
    slug: "forge-thermal-bottle",
    name: "Forge Thermal Bottle",
    category: "Lifestyle",
    priceCents: 6400,
    imagePath: "/products/forge-bottle.png",
    gallery: ["/products/forge-bottle.png", "/products/drift-weekly-planner.png"],
    tagline: "Double-wall hydration with a clean desk profile.",
    description:
      "A powder-coated steel bottle with a low-noise lid, one-hand carry loop, and volume marks for long office days.",
    features: ["24-hour cold hold", "Low-noise lid", "Dishwasher-safe cap"],
    rating: 4.8,
    reviewCount: 142,
    featuredRank: 6,
  },
  {
    slug: "orbit-charging-mat",
    name: "Orbit Charging Mat",
    category: "Workspace",
    priceCents: 8900,
    imagePath: "/products/orbit-charging-mat.png",
    gallery: ["/products/orbit-charging-mat.png", "/products/atlas-desk-kit.png"],
    tagline: "A soft landing zone for the devices you actually use.",
    description:
      "A vegan leather charging mat with dual wireless coils and a stitched cable channel for cleaner surfaces.",
    features: ["Dual wireless coils", "Stitched cable channel", "Non-slip backing"],
    rating: 4.5,
    reviewCount: 53,
    featuredRank: 4,
  },
  {
    slug: "apex-commuter-pack",
    name: "Apex Commuter Pack",
    category: "Travel",
    priceCents: 15600,
    imagePath: "/products/apex-commuter-pack.png",
    gallery: ["/products/apex-commuter-pack.png", "/products/nomad-carry-on.png"],
    tagline: "A structured pack for hybrid teams.",
    description:
      "A water-resistant commuter backpack with a suspended laptop bay, document sleeve, and fast-access side pocket.",
    features: ["Suspended laptop bay", "Water-resistant shell", "Fast-access pocket"],
    rating: 4.7,
    reviewCount: 88,
    featuredRank: 7,
  },
  {
    slug: "drift-weekly-planner",
    name: "Drift Weekly Planner",
    category: "Lifestyle",
    priceCents: 4200,
    imagePath: "/products/drift-weekly-planner.png",
    gallery: ["/products/drift-weekly-planner.png", "/products/forge-bottle.png"],
    tagline: "Analog planning for calmer delivery cycles.",
    description:
      "A lay-flat weekly planner with roadmap spreads, meeting capture pages, and recycled heavyweight paper.",
    features: ["Lay-flat binding", "Roadmap spreads", "Recycled paper stock"],
    rating: 4.6,
    reviewCount: 49,
    featuredRank: 8,
  },
] as const satisfies readonly Product[];

/**
 * Looks up a product for static product detail routes and metadata generation.
 */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
