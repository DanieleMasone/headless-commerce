import { copyFile, readdir } from "node:fs/promises";
import { join, relative, resolve, sep } from "node:path";

const root = resolve("out");

// Next.js #85374: Windows exports can nest segment payloads that the browser requests flat.
async function normalizeSegmentFiles(directory, segmentRoot) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      const parent = segmentRoot ?? (entry.name.startsWith("__next.") ? directory : undefined);
      await normalizeSegmentFiles(path, parent);
    } else if (segmentRoot && entry.name.endsWith(".txt")) {
      const filename = relative(segmentRoot, path).split(sep).join(".");
      await copyFile(path, join(segmentRoot, filename));
    }
  }
}

await normalizeSegmentFiles(root);
