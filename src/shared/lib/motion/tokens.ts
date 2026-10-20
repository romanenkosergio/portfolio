/** Durations in seconds, shared by every animation. */
export const DURATION = {
  quick: 0.2,
  fast: 0.3,
  base: 0.6,
  slow: 1
} as const;

/** Named GSAP eases: `out` settles softly, `inOut` for loops and transitions. */
export const EASE = {
  out: "expo.out",
  soft: "power3.out",
  inOut: "power2.inOut",
  /** Stepped, like a blinking terminal cursor. */
  type: "steps(12)",
  /** One hard step: a caret or key flash that is on, then off. */
  blink: "steps(1)",
  loop: "sine.inOut"
} as const;

/** Offsets and gaps. */
export const DISTANCE = { y: 24, small: 12 } as const;
export const STAGGER = { children: 0.12, chars: 0.03, words: 0.08 } as const;

/** Characters the scramble effect cycles through: code punctuation and bits. */
export const SCRAMBLE_CHARS = "01{}[]<>/\\=;:+*#";

/** Decode wave of ScrambleText: each char glitches for `char` s, a new one starts every `stagger` s. */
export const WAVE = { char: 0.15, stagger: 0.05 } as const;

/** IntersectionObserver margin for «reveal when scrolled into view»: 15% up from the bottom. */
export const SCROLL_MARGIN = "0px 0px -15% 0px";

/** Set on a primitive until GSAP owns its initial state (see styles.css). */
export const PENDING_ATTR = "data-motion-pending";

/** `desktop` breakpoint as a media condition; keep in sync with `--breakpoint-desktop` in styles.css. */
export const DESKTOP_QUERY = "(min-width: 1200px)";

/** Typing: `speed` in chars per second, caret `blink` half-period and the `hold` before it leaves, in seconds. */
export const TYPE = { speed: 30, blink: 0.5, hold: 0.35 } as const;

/** Scale factors: panel entrance, food pop, key press. */
export const SCALE = { enter: 0.96, pop: 1.4, press: 0.88 } as const;

/** Ambient loops (glow blobs): half-cycle `duration` in seconds, drift in px and degrees. */
export const DRIFT = { duration: 9, x: 28, y: 20, rotation: 10 } as const;

/** Shifts in the IDE-like chrome (explorer, tabs, code rows), px. */
export const SHIFT = { row: 8, tab: 6, note: 8 } as const;

/** Whole-set stagger budgets, s: a long list takes no longer than this to enter. */
export const CAP = { files: 0.2, lines: 0.1 } as const;
