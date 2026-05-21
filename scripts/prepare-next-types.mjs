import { readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import prettier from "prettier";

const nextEnvPath = resolve("next-env.d.ts");
const tsconfigPath = resolve("tsconfig.json");
const nextDevTypesPath = resolve(".next/dev");
const devTypesPattern = ".next/dev/types/**/*.ts";

await rm(nextDevTypesPath, { force: true, recursive: true });

const nextEnv = await readFile(nextEnvPath, "utf8");
await writeFile(
  nextEnvPath,
  nextEnv.replace("./.next/dev/types/routes.d.ts", "./.next/types/routes.d.ts"),
);

const tsconfig = JSON.parse(await readFile(tsconfigPath, "utf8"));
const prettierOptions = (await prettier.resolveConfig(tsconfigPath)) ?? {};

if (Array.isArray(tsconfig.include)) {
  tsconfig.include = tsconfig.include.filter((entry) => entry !== devTypesPattern);
}

await writeFile(
  tsconfigPath,
  await prettier.format(JSON.stringify(tsconfig), { ...prettierOptions, filepath: tsconfigPath }),
);
