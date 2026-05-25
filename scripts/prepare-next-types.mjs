import { readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { setTimeout as wait } from "node:timers/promises";

import prettier from "prettier";

const nextEnvPath = resolve("next-env.d.ts");
const tsconfigPath = resolve("tsconfig.json");
const nextDevTypesPath = resolve(".next/dev");
const devTypesPattern = ".next/dev/types/**/*.ts";

async function writeFileWithRetry(filePath, content) {
  const attempts = 5;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await writeFile(filePath, content);
      return;
    } catch (error) {
      if (attempt === attempts) {
        throw error;
      }

      await wait(100 * attempt);
    }
  }
}

await rm(nextDevTypesPath, { force: true, recursive: true });

const nextEnv = await readFile(nextEnvPath, "utf8");
await writeFileWithRetry(
  nextEnvPath,
  nextEnv.replace("./.next/dev/types/routes.d.ts", "./.next/types/routes.d.ts"),
);

const tsconfig = JSON.parse(await readFile(tsconfigPath, "utf8"));
const prettierOptions = (await prettier.resolveConfig(tsconfigPath)) ?? {};

if (Array.isArray(tsconfig.include)) {
  tsconfig.include = tsconfig.include.filter((entry) => entry !== devTypesPattern);
}

await writeFileWithRetry(
  tsconfigPath,
  await prettier.format(JSON.stringify(tsconfig), { ...prettierOptions, filepath: tsconfigPath }),
);
