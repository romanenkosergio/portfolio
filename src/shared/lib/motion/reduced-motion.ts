import gsap from "gsap";

const QUERIES = {
  full: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)"
} as const;

type MotionSetup = () => void | (() => void);

interface IMotionVariants {
  /** Full animation, for visitors who allow motion. */
  full: MotionSetup;
  /** Instant or opacity-only version; defaults to doing nothing (content stays visible). */
  reduced?: MotionSetup;
}

/**
 * Every animation goes through this: `gsap.matchMedia()` picks the `full` or
 * the `reduced` variant by `prefers-reduced-motion` and re-picks if the
 * setting changes. Call inside `useGSAP` (it reverts with the context) and
 * return the result so it is reverted on cleanup.
 */
export const matchMotion = (
  scope: Element,
  { full, reduced }: IMotionVariants
): gsap.MatchMedia => {
  const mm = gsap.matchMedia(scope);
  mm.add(QUERIES.full, full);
  mm.add(QUERIES.reduced, () => reduced?.());
  return mm;
};
