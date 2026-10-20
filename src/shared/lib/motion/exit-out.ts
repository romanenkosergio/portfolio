import gsap from "gsap";

import { prefersReducedMotion } from "./reduced-motion";
import { DURATION, EASE, SHIFT } from "./tokens";

/**
 * Fades `el` out and nudges it left, then calls `done` (remove it from the
 * store there). Reduced motion calls `done` at once. Clicks pass through
 * while it leaves.
 */
export const exitOut = (el: Element | null, done: () => void): void => {
  if (!el || prefersReducedMotion()) {
    done();
    return;
  }
  gsap.to(el, {
    opacity: 0,
    x: -SHIFT.row,
    pointerEvents: "none",
    duration: DURATION.quick,
    ease: EASE.soft,
    onComplete: done
  });
};
