import gsap from "gsap";

import { DISTANCE, DURATION, EASE, PENDING_ATTR, SCROLL_START } from "./tokens";

export interface IRevealInOptions {
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  /** Start when the element scrolls into view (once) instead of on mount. */
  scroll?: boolean;
}

/**
 * True when the host is already on screen although it is still pending (the
 * hiding CSS did not apply, or its 3 s failsafe fired): an entrance would
 * only hide it and replay. Then the caller just clears the attribute.
 */
export const isAlreadyVisible = (host: HTMLElement): boolean => {
  if (getComputedStyle(host).opacity === "0") return false;
  host.removeAttribute(PENDING_ATTR);
  return true;
};

/**
 * Fades (and lifts) `targets` in. `host` is the primitive's own element: it is
 * hidden by CSS while `data-motion-pending` is set, so the initial state is
 * applied here first and only then handed over. Reduced motion gets a plain fade.
 */
export const revealIn = (
  host: HTMLElement,
  targets: gsap.TweenTarget,
  reduced: boolean,
  {
    delay = 0,
    duration = DURATION.base,
    y = DISTANCE.y,
    stagger = 0,
    scroll = false
  }: IRevealInOptions
): void => {
  if (isAlreadyVisible(host)) return;
  const scrollTrigger = scroll
    ? { trigger: host, start: SCROLL_START, once: true }
    : undefined;
  gsap.from(targets, {
    opacity: 0,
    y: reduced ? 0 : y,
    duration: reduced ? DURATION.fast : duration,
    delay: reduced ? 0 : delay,
    stagger: reduced ? 0 : stagger,
    ease: EASE.out,
    scrollTrigger
  });
  host.removeAttribute(PENDING_ATTR);
};
