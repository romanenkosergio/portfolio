#!/usr/bin/env node
/**
 * The about page's code snippets must be real: every line of an excerpt (but a `// …` cut)
 * has to appear, trimmed, in the file its `path` names.
 */

import { readFileSync } from "node:fs";

const CONFIG = "src/pages/about/config/snippets.ts";
const SNIPPET = /path: "([^"]+)",\s*code: `([^`]*)`/g;

const source = readFileSync(CONFIG, "utf8");
const problems = [];
let count = 0;

for (const [, path, code] of source.matchAll(SNIPPET)) {
  count += 1;
  const lines = new Set(
    readFileSync(path, "utf8")
      .split("\n")
      .map(line => line.trim())
  );
  for (const line of code.split("\n").map(item => item.trim())) {
    if (line && line !== "// …" && !lines.has(line)) {
      problems.push(`${path}: not in the file: ${line}`);
    }
  }
}

if (count === 0) problems.push(`${CONFIG}: no snippet found`);
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`snippets: ${count} excerpts match their files.`);
