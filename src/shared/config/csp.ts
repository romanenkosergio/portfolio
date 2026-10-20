// Static export on Pages sends no headers, so the policy ships as a <meta http-equiv> tag
// (frame-ancestors is ignored there and left out). Next's inline bootstrap/RSC scripts need
// 'unsafe-inline'; the dev server also needs eval and the HMR websocket.
const isDev = process.env.NODE_ENV === "development";

const DIRECTIVES: Record<string, string[]> = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    ...(isDev ? ["'unsafe-eval'"] : [])
  ],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:"],
  "font-src": ["'self'"],
  "connect-src": ["'self'", ...(isDev ? ["ws:"] : [])],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"]
};

export const CSP = Object.entries(DIRECTIVES)
  .map(([name, sources]) => [name, ...sources].join(" "))
  .join("; ");

export const REFERRER_POLICY = "strict-origin-when-cross-origin";
