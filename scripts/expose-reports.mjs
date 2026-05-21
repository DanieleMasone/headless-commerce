import { access, cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const reports = [
  {
    name: "TypeDoc documentation",
    requiredFile: "docs/index.html",
    source: "docs",
    target: "out/docs",
  },
  {
    name: "Vitest coverage report",
    requiredFile: "coverage/index.html",
    source: "coverage",
    target: "out/coverage",
  },
];

await access(resolve("out/index.html"));

for (const report of reports) {
  await access(resolve(report.requiredFile));
  await rm(resolve(report.target), { force: true, recursive: true });
  await mkdir(resolve(report.target), { recursive: true });
  await cp(resolve(report.source), resolve(report.target), { recursive: true });
  console.info(`Published ${report.name} at ${report.target}/`);
}
