/**
 * Returns the base path configured for GitHub Pages project deployments.
 */
export function getBasePath(): string {
  const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";

  if (rawBasePath.length === 0 || rawBasePath === "/") {
    return "";
  }

  return `/${rawBasePath.replace(/^\/+|\/+$/g, "")}`;
}

/**
 * Prefixes public assets with the optional Next.js base path.
 */
export function withBasePath(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${getBasePath()}${normalizedPath}`;
}
