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

const escapeHtml = text =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Bare e-mails, domain/path tokens and the Telegram handle become real links.
const autolink = html =>
  html
    .replace(
      /(^|[\s(])([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g,
      '$1<a href="mailto:$2">$2</a>'
    )
    .replace(
      /(^|[\s(])((?:[a-z0-9-]+\.)+[a-z]{2,}\/[^\s·,;)<]*)/gi,
      '$1<a href="https://$2">$2</a>'
    )
    .replace(/(Telegram: )@(\w+)/, '$1<a href="https://t.me/$2">@$2</a>');

const inline = text =>
  autolink(
    escapeHtml(text)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
  );

const lineHtml = text => {
  if (/^\*\*[^*]+\*\* · [^·]+$/.test(text)) {
    const [role, dates] = text.split(" · ");
    return `<p class="role">${inline(role)}<span class="dates">${inline(dates)}</span></p>`;
  }
  if (/^\*[^*].*\*$/.test(text)) {
    return `<p class="note">${inline(text)}</p>`;
  }
  return `<p>${inline(text)}</p>`;
};

// Only the constructs cv-en.md uses: #/##/### headings, bold role lines, italic notes, bullets, paragraphs.
const render = markdown => {
  const out = [];
  let inList = false;
  let inSection = false;
  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };
  const closeSection = () => {
    closeList();
    if (inSection) {
      out.push("</section>");
      inSection = false;
    }
  };

  for (const line of markdown.split("\n")) {
    const text = line.trim();
    const heading = /^(#{1,3}) (.+)$/.exec(text);
    if (!text) {
      closeList();
    } else if (heading) {
      const level = heading[1].length;
      if (level === 2) {
        closeSection();
        out.push("<section>");
        inSection = true;
      } else {
        closeList();
      }
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
    } else if (text.startsWith("- ")) {
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${inline(text.slice(2))}</li>`);
    } else {
      closeList();
      out.push(lineHtml(text));
    }
  }
  closeSection();
  return out.join("\n");
};

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
