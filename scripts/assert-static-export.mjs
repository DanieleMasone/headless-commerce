import { access } from "node:fs/promises";
import { resolve } from "node:path";

const requiredFiles = [
  "out/index.html",
  "out/checkout/index.html",
  "out/engineering/index.html",
  "out/guide/index.html",
  "out/coverage/index.html",
  "out/docs/index.html",
  "out/product/atlas-modular-desk-kit/index.html",
];

await Promise.all(requiredFiles.map((file) => access(resolve(file))));
