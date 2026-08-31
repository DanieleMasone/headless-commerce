import { access, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const summaryPath = resolve("coverage/coverage-summary.json");
const outputPath = resolve("out/coverage-badge.json");

await access(resolve("out/index.html"));

let summary;

try {
  summary = JSON.parse(await readFile(summaryPath, "utf8"));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  throw new Error(`Unable to read Vitest coverage summary: ${message}`);
}

const lines = summary?.total?.lines;
const percentage = lines?.pct;

if (
  !Number.isInteger(lines?.total) ||
  lines.total <= 0 ||
  !Number.isInteger(lines?.covered) ||
  lines.covered < 0 ||
  lines.covered > lines.total ||
  typeof percentage !== "number" ||
  !Number.isFinite(percentage) ||
  percentage < 0 ||
  percentage > 100
) {
  throw new Error("Vitest coverage summary does not contain valid total line coverage.");
}

const color =
  percentage >= 90
    ? "brightgreen"
    : percentage >= 80
      ? "green"
      : percentage >= 70
        ? "yellowgreen"
        : percentage >= 60
          ? "yellow"
          : "red";

const badge = {
  schemaVersion: 1,
  label: "coverage",
  message: `${percentage}%`,
  color,
};

await writeFile(outputPath, `${JSON.stringify(badge, null, 2)}\n`, "utf8");
console.info(`Generated coverage badge endpoint at out/coverage-badge.json (${percentage}%).`);
