import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { matchMotion } from "./reduced-motion";
import { isAlreadyVisible } from "./reveal-in";
import { CAP, DURATION, EASE, PENDING_ATTR, SHIFT } from "./tokens";

/** Markers on the cells of a code grid: the line number and the line text. */
export const LINE_NUMBER = "data-line-number";
export const LINE_TEXT = "data-line-text";

const revealLines = (
  host: HTMLElement,
  reduced: boolean,
  eager: boolean
): void => {
  if (eager) {
    // Painted visible in the server HTML: the rows only slide in, nothing fades.
    if (!reduced) {
      gsap.from(host.querySelectorAll(`[${LINE_TEXT}]`), {
        x: SHIFT.row,
        duration: DURATION.quick,
        ease: EASE.soft,
        clearProps: "transform",
        stagger: { amount: CAP.lines }
      });
    }
    return;
  }
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
    .from(numbers, {
      opacity: 0,
      clearProps: "opacity",
      stagger: { amount: CAP.lines }
    })
    .from(
      texts,
      {
        opacity: 0,
        x: SHIFT.row,
        clearProps: "opacity,transform",
        stagger: { amount: CAP.lines }
      },
      0.05
    );
  host.removeAttribute(PENDING_ATTR);
};

/** Line numbers, then the text rows, fade in fast (~0.35 s for any length); `eager` paints the file visible at once and only slides the text; reduced motion shows the file. */
export const useLinesReveal = (
  ref: RefObject<HTMLElement | null>,
  eager = false
): void => {
  useGSAP(
    () => {
      const host = ref.current;
      if (!host) return;
      const mm = matchMotion(host, {
        full: () => revealLines(host, false, eager),
        reduced: () => revealLines(host, true, eager)
      });
      return () => mm.revert();
    },
    { scope: ref }
  );
};
