// Runs size-limit with Next's `noModule` polyfill chunk left out of the JS budget (D22): it only
// loads in legacy browsers. The file is found by its `noModule` script tag, never by its hashed name.
import { spawnSync } from "node:child_process";
import { readFileSync, rmSync, writeFileSync } from "node:fs";

const OUT = "out";
const html = readFileSync(`${OUT}/en/index.html`, "utf8");
// The deploy build prefixes `src` with the base path (`/portfolio/_next/…`); out/ has no such folder.
const tag = /<script[^>]*\bnoModule\b[^>]*>/i.exec(html)?.[0] ?? "";
const polyfill = /\bsrc="[^"]*?(_next\/[^"]+\.js)"/.exec(tag)?.[1];
if (!polyfill) throw new Error("size: no noModule script in out/en/index.html");

const config = JSON.parse(readFileSync(".size-limit.json", "utf8")).map(
  entry =>
    entry.path.endsWith("*.js")
      ? { ...entry, path: [entry.path, `!${OUT}/${polyfill}`] }
      : entry
);
const file = ".size-limit.generated.json";
writeFileSync(file, JSON.stringify(config));
const { status } = spawnSync("yarn", ["-s", "size-limit", "--config", file], {
  stdio: "inherit"
});
rmSync(file);
process.exit(status ?? 1);
