/** Durations in seconds, shared by every animation. */
export const DURATION = {
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
  type: "steps(12)"
} as const;

/** Offsets and gaps. */
export const DISTANCE = { y: 24 } as const;
export const STAGGER = { children: 0.12, chars: 0.03, words: 0.08 } as const;

/** Characters the scramble effect cycles through: code punctuation and bits. */
export const SCRAMBLE_CHARS = "01{}[]<>/\\=;:+*#";

/** Decode wave of ScrambleText: each char glitches for `char` s, a new one starts every `stagger` s. */
export const WAVE = { char: 0.15, stagger: 0.05 } as const;

/** IntersectionObserver margin for «reveal when scrolled into view»: 15% up from the bottom. */
export const SCROLL_MARGIN = "0px 0px -15% 0px";

/** Set on a primitive until GSAP owns its initial state (see styles.css). */
export const PENDING_ATTR = "data-motion-pending";
