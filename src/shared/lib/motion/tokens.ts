/** Durations in seconds, shared by every animation. */
export const DURATION = {
  fast: 0.3,
  base: 0.6,
  slow: 1,
  scramble: 1.2
} as const;

/** Named GSAP eases: `out` settles softly, `inOut` for loops and transitions. */
export const EASE = {
  out: "expo.out",
  soft: "power3.out",
  inOut: "power2.inOut",
  /** Stepped, like a blinking terminal cursor. */
  type: "steps(12)"
} as const;

/** Offsets and gaps. */
export const DISTANCE = { y: 24 } as const;
export const STAGGER = { children: 0.12, chars: 0.03, words: 0.08 } as const;

/** Characters the scramble effect cycles through: code punctuation and bits. */
export const SCRAMBLE_CHARS = "01{}[]<>/\\=;:+*#";

/** ScrollTrigger start for «reveal when scrolled into view». */
export const SCROLL_START = "top 85%";

/** Set on a primitive until GSAP owns its initial state (see styles.css). */
export const PENDING_ATTR = "data-motion-pending";
