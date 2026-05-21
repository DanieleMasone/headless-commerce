import type { NextConfig } from "next";

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const normalizedBasePath =
  rawBasePath.length === 0 || rawBasePath === "/"
    ? ""
    : `/${rawBasePath.replace(/^\/+|\/+$/g, "")}`;

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: normalizedBasePath || undefined,
  assetPrefix: normalizedBasePath || undefined,
};

export default nextConfig;
