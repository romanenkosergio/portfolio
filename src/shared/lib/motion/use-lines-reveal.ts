import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { matchMotion } from "./reduced-motion";
import { isAlreadyVisible } from "./reveal-in";
import { CAP, DURATION, EASE, PENDING_ATTR, SHIFT } from "./tokens";

/** Markers on the cells of a code grid: the line number and the line text. */
export const LINE_NUMBER = "data-line-number";
export const LINE_TEXT = "data-line-text";

const revealLines = (host: HTMLElement, reduced: boolean): void => {
  if (isAlreadyVisible(host)) return;
  if (reduced) {
    host.removeAttribute(PENDING_ATTR);
    return;
  }
  const numbers = host.querySelectorAll(`[${LINE_NUMBER}]`);
  const texts = host.querySelectorAll(`[${LINE_TEXT}]`);
  // Stagger `amount` is the whole spread, so a long file takes as long as a short one.
  gsap
    .timeline({ defaults: { ease: EASE.soft, duration: DURATION.quick } })
    .from(numbers, { opacity: 0, stagger: { amount: CAP.lines } })
    .from(
      texts,
      { opacity: 0, x: SHIFT.row, stagger: { amount: CAP.lines } },
      0.05
    );
  host.removeAttribute(PENDING_ATTR);
};

/** Line numbers, then the text rows, fade in fast (~0.35 s for any length); reduced motion shows the file. */
export const useLinesReveal = (ref: RefObject<HTMLElement | null>): void => {
  useGSAP(
    () => {
      const host = ref.current;
      if (!host) return;
      const mm = matchMotion(host, {
        full: () => revealLines(host, false),
        reduced: () => revealLines(host, true)
      });
      return () => mm.revert();
    },
    { scope: ref }
  );
};
