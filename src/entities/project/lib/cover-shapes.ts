// Deterministic abstract cover art: the same slug always draws the same shapes. Colours are
// palette tokens (CSS variables), so a retheme reaches the covers too.
const PALETTE = [
  "var(--color-accent-1)",
  "var(--color-accent-2)",
  "var(--color-accent-3)",
  "var(--color-accent-4)",
  "var(--color-accent-6)",
  "var(--color-secondary-2)",
  "var(--color-secondary-3)"
] as const;

export const COVER_WIDTH = 370;
export const COVER_HEIGHT = 145;

export interface ICoverGlow {
  cx: number;
  cy: number;
  r: number;
  color: string;
}

export interface ICoverLine {
  x: number;
  y: number;
  length: number;
  angle: number;
  color: string;
}

export interface ICover {
  glows: ICoverGlow[];
  lines: ICoverLine[];
}

// FNV-1a hash of the slug seeds mulberry32.
const seedOf = (slug: string): number =>
  [...slug].reduce(
    (hash, char) => Math.imul(hash ^ char.charCodeAt(0), 16777619),
    2166136261
  ) >>> 0;

const random = (seed: number) => {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export const coverOf = (slug: string): ICover => {
  const next = random(seedOf(slug));
  const color = () => PALETTE[Math.floor(next() * PALETTE.length)];

  const glows = Array.from({ length: 3 }, () => ({
    cx: next() * COVER_WIDTH,
    cy: next() * COVER_HEIGHT,
    r: 60 + next() * 70,
    color: color()
  }));
  const lines = Array.from({ length: 9 }, () => ({
    x: next() * COVER_WIDTH,
    y: next() * COVER_HEIGHT,
    length: 40 + next() * 120,
    angle: -60 + next() * 120,
    color: color()
  }));

  return { glows, lines };
};
