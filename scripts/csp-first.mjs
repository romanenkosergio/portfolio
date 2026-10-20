#!/usr/bin/env node
/**
 * A CSP <meta> only governs what follows it, but Next hoists its own preloads, stylesheet and
 * script tags above the layout's <head> children. After the build, move the policy right after
 * the charset meta in every page of out/. Redirect pages (permanentRedirect) render Next's bare
 * error shell with no layout head, so they get the same policy copied in; the build fails if no
 * page carries one at all. Safe to run twice.
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const CSP_META = /<meta http-equiv="Content-Security-Policy"[^>]*>/;
const CHARSET_META = /<meta charSet="utf-8"\/?>/;

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* htmlFiles(path);
    else if (entry.endsWith(".html")) yield path;
  }
}

const files = [...htmlFiles(OUT)];
const policy = files
  .map(file => readFileSync(file, "utf8").match(CSP_META)?.[0])
  .find(Boolean);

if (!policy) {
  console.error(
    `csp-first: no Content-Security-Policy meta anywhere in ${OUT}/.`
  );
  process.exit(1);
}

for (const file of files) {
  const html = readFileSync(file, "utf8");
  const rest = html.replace(CSP_META, "");
  const meta = html.match(CSP_META)?.[0] ?? policy;
  const next = CHARSET_META.test(rest)
    ? rest.replace(CHARSET_META, charset => charset + meta)
    : rest.replace("<head>", () => "<head>" + meta);
  if (next !== html) writeFileSync(file, next);
}

console.log(`csp-first: policy leads <head> in every page of ${OUT}/.`);
