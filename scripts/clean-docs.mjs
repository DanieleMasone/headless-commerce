import { rm } from "node:fs/promises";
import { resolve } from "node:path";

await rm(resolve("docs"), { force: true, recursive: true });
