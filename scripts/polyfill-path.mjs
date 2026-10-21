/**
 * The path (under `out/`) of Next's `noModule` polyfill chunk, found by its script tag, never by
 * its hashed name. The deploy build prefixes `src` with the base path (`/portfolio/_next/…`);
 * out/ has no such folder, so the match starts at `_next/`.
 */
export const polyfillPath = html => {
  const tag = /<script[^>]*\bnoModule\b[^>]*>/i.exec(html)?.[0] ?? "";
  return /\bsrc="[^"]*?(_next\/[^"]+\.js)"/.exec(tag)?.[1];
};
