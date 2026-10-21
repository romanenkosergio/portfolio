/** Start times in seconds of the hero sequence; it reads in about 3 s. */
export const HERO_DELAY = {
  greeting: 0.1,
  name: 0.4,
  role: 0.9,
  summary: 1.3,
  panel: 1.7,
  bolts: 2.1,
  actions: 2.2,
  code: 2.4,
  stats: 2.6
} as const;

/** Pause between the items of a hero row, s (the toolkit's `STAGGER.children`, which server code cannot import). */
export const HERO_STEP = 0.12;

/** Typing speeds of the hero lines, chars per second: the long summary types faster than the role. */
export const HERO_SPEED = { role: 50, summary: 80 } as const;

/** Technologies of the stack row, in order (keys of `TECHS`). */
export const HERO_STACK = [
  "react",
  "nextjs",
  "typescript",
  "javascript"
] as const;
