// Builds the CV PDF: scripts/cv/cv-en.md -> HTML (scripts/cv/cv.css) -> PDF through headless Chrome.
// Run `yarn cv` after editing the markdown; the PDF is committed (public/assets/cv). CHROME_PATH overrides the browser.
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { escapeHtml, render } from "./cv/render.mjs";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const SOURCE = path.join(DIR, "cv", "cv-en.md");
const STYLE = path.join(DIR, "cv", "cv.css");
const OUTPUT = path.join(
  DIR,
  "..",
  "public",
  "assets",
  "cv",
  "serhii-romanenko-cv.pdf"
);

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser"
];

const markdown = readFileSync(SOURCE, "utf8");
const name = /^# (.+)$/m.exec(markdown)?.[1];
if (!name) {
  throw new Error("cv-en.md needs a `# Name` heading");
}

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(name)} — CV</title>
<meta name="author" content="${escapeHtml(name)}">
<style>${readFileSync(STYLE, "utf8")}</style>
</head>
<body>
<main>
${render(markdown)}
</main>
</body>
</html>
`;

const chrome = CHROME_CANDIDATES.find(
  candidate => candidate && existsSync(candidate)
);
if (!chrome) {
  throw new Error("Chrome not found; set CHROME_PATH");
}

const workDir = mkdtempSync(path.join(tmpdir(), "cv-"));
try {
  const htmlFile = path.join(workDir, "cv.html");
  writeFileSync(htmlFile, html);
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--generate-pdf-document-outline",
      `--print-to-pdf=${OUTPUT}`,
      pathToFileURL(htmlFile).href
    ],
    { stdio: "ignore" }
  );
} finally {
  rmSync(workDir, { recursive: true, force: true });
}
console.log(`CV written to ${path.relative(process.cwd(), OUTPUT)}`);
