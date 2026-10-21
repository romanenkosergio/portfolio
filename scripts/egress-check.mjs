#!/usr/bin/env node
/**
 * Egress, enumerated rather than described.
 *
 * The site makes no requests of its own; the only hosts in the source are links a visitor
 * opens. This walks production source and fails on any host literal that is not on the list
 * below, each entry saying why it is not a request.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["src", "app", "messages"];

/** Each entry is a host that may appear in source, and the reason it is not egress. */
const ALLOWED = [
  { host: "localhost", why: "the local dev server" },
  { host: "github.com", why: "profile link the visitor opens, not a request" },
  {
    host: "linkedin.com",
    why: "profile link the visitor opens, not a request"
  },
  { host: "medium.com", why: "profile link the visitor opens, not a request" },
  { host: "x.com", why: "profile link the visitor opens, not a request" },
  {
    host: "dareboard.app",
    why: "project site the visitor opens, not a request"
  }
];

const SKIP_DIR = new Set(["node_modules", ".next", "out"]);
const SOURCE = /\.(ts|tsx|js|jsx|mjs|cjs|json|css)$/;

function* sourceFiles(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const entry of entries) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      if (!SKIP_DIR.has(entry)) yield* sourceFiles(path);
    } else if (SOURCE.test(entry)) {
      yield path;
    }
  }
}

// An absolute http(s)/ws(s) URL, or a protocol-relative //host right after a quote or "(".
const URL_HOST =
  /(?:(?:https?|wss?):\/\/|["'`(]\/\/)(?:\$\{[^}]*\}|[a-zA-Z0-9._-])+/g;
const CONFIG_HOST = /^\$\{[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*\}/;

const findings = [];

for (const root of ROOTS) {
  for (const file of sourceFiles(root)) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, index) => {
      for (const url of line.match(URL_HOST) ?? []) {
        const host = url
          .replace(/^["'`(]/, "")
          .replace(/^(?:(?:https?|wss?):)?\/\//, "");
        // Built from configuration rather than written down: that is the wanted shape. Only a
        // plain identifier or member expression counts; a string literal inside ${} does not.
        if (CONFIG_HOST.test(host)) continue;
        if (
          ALLOWED.some(
            ({ host: allowed }) =>
              host === allowed || host.endsWith(`.${allowed}`)
          )
        )
          continue;
        findings.push({ file: relative(".", file), line: index + 1, url });
      }
    });
  }
}

if (findings.length === 0) {
  console.log(`egress: no host outside the allow-list in ${ROOTS.join(", ")}.`);
  process.exit(0);
}

console.error("egress: source names a host the allow-list does not carry.\n");
for (const { file, line, url } of findings)
  console.error(`  ${file}:${line}  ${url}`);
console.error(
  "\nTake the origin from configuration, or add the host to ALLOWED in this file with the reason."
);
process.exit(1);
