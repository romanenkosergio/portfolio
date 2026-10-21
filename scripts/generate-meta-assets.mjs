// Builds the favicons and the social picture from the SVG sources below (palette from src/app/styles/styles.css).
// Run: node scripts/generate-meta-assets.mjs. The text in the picture needs Fira Code installed locally; the
// outputs are committed, so this runs only when the design changes.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import sharp from "sharp";

const ICONS = "public/assets/icons/favicons";
const IMAGES = "public/assets/images";
const C = {
  bg: "#011627",
  deep: "#010c15",
  line: "#1e2d3d",
  muted: "#607b96",
  orange: "#fea55f",
  teal: "#43d9ad",
  violet: "#c98bdf",
  blue: "#4d5bce",
  text: "#e5e9f0"
};

// `>_` on a dark rounded square; drawn as paths so no font is needed.
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${C.bg}"/>
  <path d="M14 20l16 12-16 12" fill="none" stroke="${C.orange}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M36 46h16" fill="none" stroke="${C.teal}" stroke-width="7" stroke-linecap="round"/>
</svg>
`;

const font = "'Fira Code', monospace";
const pictureSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.bg}"/>
      <stop offset="1" stop-color="${C.deep}"/>
    </linearGradient>
    <radialGradient id="glowTeal"><stop offset="0" stop-color="${C.teal}" stop-opacity=".28"/><stop offset="1" stop-color="${C.teal}" stop-opacity="0"/></radialGradient>
    <radialGradient id="glowOrange"><stop offset="0" stop-color="${C.orange}" stop-opacity=".22"/><stop offset="1" stop-color="${C.orange}" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1010" cy="170" r="300" fill="url(#glowTeal)"/>
  <circle cx="1100" cy="560" r="260" fill="url(#glowOrange)"/>
  <g stroke="${C.line}" stroke-width="2" fill="none">
    <circle cx="990" cy="300" r="170"/>
    <circle cx="990" cy="300" r="250"/>
    <path d="M700 630L1200 130M800 630L1200 230"/>
  </g>
  <rect x="860" y="120" width="150" height="150" rx="26" fill="none" stroke="${C.violet}" stroke-width="3" opacity=".55" transform="rotate(14 935 195)"/>
  <circle cx="1060" cy="420" r="46" fill="${C.blue}" opacity=".5"/>
  <path d="M860 470l40 30-40 30" fill="none" stroke="${C.orange}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>
  <path d="M930 530h50" fill="none" stroke="${C.teal}" stroke-width="12" stroke-linecap="round" opacity=".9"/>
  <g font-family="${font}">
    <text x="80" y="150" font-size="30" fill="${C.muted}">// portfolio</text>
    <text x="80" y="290" font-size="84" font-weight="700" fill="${C.text}">Serhii</text>
    <text x="80" y="385" font-size="84" font-weight="700" fill="${C.text}">Romanenko</text>
    <text x="80" y="480" font-size="40" fill="${C.orange}">&gt;</text>
    <text x="130" y="480" font-size="40" fill="${C.teal}">Front-end developer</text>
    <text x="80" y="560" font-size="26" fill="${C.muted}">React · Next.js · TypeScript</text>
  </g>
</svg>
`;

// ICO container holding PNG frames (valid since Vista; every current browser reads it).
const ico = frames => {
  const head = Buffer.alloc(6 + 16 * frames.length);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(frames.length, 4);
  let offset = head.length;
  frames.forEach(({ size, png }, i) => {
    const at = 6 + 16 * i;
    head.writeUInt8(size, at);
    head.writeUInt8(size, at + 1);
    head.writeUInt16LE(1, at + 4);
    head.writeUInt16LE(32, at + 6);
    head.writeUInt32LE(png.length, at + 8);
    head.writeUInt32LE(offset, at + 12);
    offset += png.length;
  });
  return Buffer.concat([head, ...frames.map(f => f.png)]);
};

const manifest = {
  name: "Serhii Romanenko",
  short_name: "Serhii R.",
  icons: [
    { src: "icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "icon-512.png", sizes: "512x512", type: "image/png" }
  ],
  theme_color: C.bg,
  background_color: C.bg,
  display: "browser"
};

const png = (svg, size) =>
  sharp(Buffer.from(svg), { density: 384 }).resize(size, size).png().toBuffer();

mkdirSync(ICONS, { recursive: true });
mkdirSync(IMAGES, { recursive: true });
writeFileSync(join(ICONS, "favicon.svg"), faviconSvg);
writeFileSync(join(IMAGES, "meta-picture.svg"), pictureSvg);
writeFileSync(
  join(ICONS, "site.webmanifest"),
  `${JSON.stringify(manifest, null, 2)}\n`
);
const frames = await Promise.all(
  [16, 32, 48].map(async size => ({ size, png: await png(faviconSvg, size) }))
);
writeFileSync(join(ICONS, "favicon.ico"), ico(frames));
writeFileSync(join(ICONS, "apple-touch-icon.png"), await png(faviconSvg, 180));
writeFileSync(join(ICONS, "icon-192.png"), await png(faviconSvg, 192));
writeFileSync(join(ICONS, "icon-512.png"), await png(faviconSvg, 512));
await sharp(Buffer.from(pictureSvg), { density: 96 })
  .png()
  .toFile(join(IMAGES, "meta-picture.png"));
