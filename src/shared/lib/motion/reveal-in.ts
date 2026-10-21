import gsap from "gsap";

import {
  DISTANCE,
  DURATION,
  EASE,
  PENDING_ATTR,
  SCROLL_MARGIN
} from "./tokens";

export interface IRevealInOptions {
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  /** Start when the element scrolls into view (once, via IntersectionObserver) instead of on mount. */
  scroll?: boolean;
  /** Inline props to strip once the entrance ends (GSAP's `clearProps`). */
  clearProps?: string;
}

/**
 * The verdict is taken once per host, on the first run: React strict mode (and
 * a dependency change) runs the effect again after the first run stripped the
 * attribute, and a second look would read that as «already visible».
 */
const visibleAtStart = new WeakMap<HTMLElement, boolean>();

/**
 * True when the host is already on screen although it is still pending (the
 * hiding CSS did not apply, or its 3 s failsafe fired): an entrance would
 * only hide it and replay. Then the caller just clears the attribute.
 */
export const isAlreadyVisible = (host: HTMLElement): boolean => {
  let visible = visibleAtStart.get(host);
  if (visible === undefined) {
    visible = getComputedStyle(host).opacity !== "0";
    visibleAtStart.set(host, visible);
  }
  if (visible) host.removeAttribute(PENDING_ATTR);
  return visible;
};

/**
 * Fades (and lifts) `targets` in. `host` is the primitive's own element: it is
 * hidden by CSS while `data-motion-pending` is set, so the initial state is
 * applied here first and only then handed over. Reduced motion shows the final state at once.
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
    scroll = false,
    clearProps
  }: IRevealInOptions
): void | (() => void) => {
  if (isAlreadyVisible(host)) return;
  // Reduced motion: the final state at once, no fade.
  if (reduced) {
    host.removeAttribute(PENDING_ATTR);
    return;
  }
  const tween = gsap.from(targets, {
    opacity: 0,
    y,
    duration,
    delay,
    stagger,
    ease: EASE.out,
    clearProps,
    paused: scroll
  });
  host.removeAttribute(PENDING_ATTR);
  if (!scroll) return;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      tween.play();
    },
    { rootMargin: SCROLL_MARGIN }
  );
  observer.observe(host);
  return () => observer.disconnect();
};
