import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT ?? 4173);

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
]);

async function resolveStaticPath(requestUrl) {
  const url = new URL(requestUrl, `http://127.0.0.1:${port}`);
  const safePath = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  const candidate = resolve(join(root, safePath));

  if (!candidate.startsWith(root)) {
    return null;
  }

  try {
    const fileStat = await stat(candidate);
    if (fileStat.isFile()) {
      return candidate;
    }
    if (fileStat.isDirectory()) {
      return join(candidate, "index.html");
    }
  } catch {
    return join(root, "404.html");
  }

  return null;
}

createServer(async (request, response) => {
  const filePath = await resolveStaticPath(request.url ?? "/");

  if (!filePath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    await stat(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypes.get(extname(filePath)) ?? "application/octet-stream",
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Static export available at http://127.0.0.1:${port}`);
});
