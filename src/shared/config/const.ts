// GitHub Pages serves the site under /<repo>; the deploy workflow sets it, empty locally.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

// The deploy workflow sets the public host (+ base path); locally the dev server answers on :3000.
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export const APP_CONFIG = {
  BASE_URL: DOMAIN ? `https://${DOMAIN}` : "http://localhost:3000"
};
