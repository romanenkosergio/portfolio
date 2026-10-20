import gsap from "gsap";

import { prefersReducedMotion } from "./reduced-motion";
import { DURATION, EASE, SHIFT } from "./tokens";

/**
 * Fades `el` out and nudges it left, then calls `done` once (remove it from
 * the store there). Reduced motion calls `done` at once. Clicks pass through
 * while it leaves. Returns a cancel: the element is restored and `done` never runs.
 */
export const exitOut = (el: Element | null, done: () => void): (() => void) => {
  let settled = false;
  const finish = () => {
    if (settled) return;
    settled = true;
    done();
  };
  if (!el || prefersReducedMotion()) {
    finish();
    return () => undefined;
  }
  const context = gsap.context(() => {
    gsap.to(el, {
      opacity: 0,
      x: -SHIFT.row,
      pointerEvents: "none",
      duration: DURATION.quick,
      ease: EASE.soft,
      onComplete: finish
    });
  });
  return () => {
    settled = true;
    context.revert();
  };
};
