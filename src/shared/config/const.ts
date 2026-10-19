// GitHub Pages serves the site under /<repo>; the deploy workflow sets it, empty locally.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

// The deploy workflow sets the public host (+ base path); locally the dev server answers on :3000.
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export const APP_CONFIG = {
  BASE_URL: DOMAIN ? `https://${DOMAIN}` : "http://localhost:3000"
};

export const GITHUB_URL = "https://github.com/romanenkosergio";

// Next replaces `openGraph` wholesale per page, so every page spreads this base first
// (its texts come from the `meta` messages).
export const OPEN_GRAPH = {
  type: "website",
  images: "/assets/images/meta-picture.png"
} as const;

// First job in the CV; the years of experience in the about texts are counted from it.
export const CAREER_START = new Date(2017, 4, 1);
