// `yarn shadcn:add <name> [--overwrite]`: runs the shadcn CLI, then moves every
// generated flat `shared/ui/<x>.tsx` (the component and its registry
// dependencies) into `shared/ui/<x>/<x>.tsx` + `index.ts`, exports each from
// `shared/ui/index.ts`, drops the bogus `cn` package the CLI adds, and runs
// Prettier + `eslint --fix` on what it touched.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const UI = "src/shared/ui";
const args = process.argv.slice(2);
const overwrite = args.includes("--overwrite");
const name = args.find(arg => !arg.startsWith("--"));

const fail = message => {
  console.error(message);
  process.exit(1);
};

if (!name) fail("usage: yarn shadcn:add <component> [--overwrite]");
if (fs.existsSync(path.join(UI, name)) && !overwrite)
  fail(`${UI}/${name}/ already exists; pass --overwrite to replace it`);

const flatFiles = () =>
  new Set(fs.readdirSync(UI).filter(file => file.endsWith(".tsx")));
const before = flatFiles();

execFileSync("yarn", ["shadcn", "add", name, "--yes"], { stdio: "inherit" });

const created = [...flatFiles()].filter(file => !before.has(file));
if (!created.includes(`${name}.tsx`))
  fail(`shadcn did not produce ${UI}/${name}.tsx`);

// Check every target first, so a clash leaves no half-moved state.
const clashes = created
  .map(file => path.basename(file, ".tsx"))
  .filter(item => item !== name && fs.existsSync(path.join(UI, item)));
if (clashes.length) {
  for (const item of clashes) fs.unlinkSync(path.join(UI, `${item}.tsx`));
  fail(
    `registry dependency already exists as a folder: ${clashes.join(", ")}. ` +
      "The flat copies were removed; the existing components were kept."
  );
}

const touched = [];
const barrel = path.join(UI, "index.ts");

for (const file of created) {
  const item = path.basename(file, ".tsx");
  const source = fs
    .readFileSync(path.join(UI, file), "utf8")
    .replace(
      /(from ["'])(?:cn|@\/lib\/utils|@\/shared\/lib\/utils)(["'])/g,
      "$1@/shared/lib$2"
    );
  const exported = [...source.matchAll(/^export \{([^}]+)\}/gm)]
    .flatMap(([, list]) => list.split(","))
    .map(entry => entry.trim())
    .filter(Boolean);
  if (!exported.length) fail(`no \`export { … }\` found in ${UI}/${file}`);

  const dir = path.join(UI, item);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${item}.tsx`), source);
  fs.writeFileSync(
    path.join(dir, "index.ts"),
    `export { ${exported.join(", ")} } from "./${item}";\n`
  );
  fs.unlinkSync(path.join(UI, file));
  touched.push(dir);

  const line = `export * from "./${item}";`;
  const current = fs.readFileSync(barrel, "utf8");
  if (!current.includes(line))
    fs.writeFileSync(barrel, `${current.trimEnd()}\n${line}\n`);
}
touched.push(barrel);

// The CLI resolves the `@/shared/lib` alias to an npm package named `cn`.
const pkgPath = "package.json";
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
if (pkg.dependencies?.cn) {
  console.log("removing the stray `cn` dependency the CLI added");
  execFileSync("yarn", ["remove", "cn"], { stdio: "inherit" });
}

execFileSync("yarn", ["prettier", "--write", ...touched], { stdio: "inherit" });
execFileSync("yarn", ["eslint", "--fix", ...touched], { stdio: "inherit" });
