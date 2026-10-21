import { useEffect, useRef } from "react";
import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import {
  DISTANCE,
  DURATION,
  EASE,
  SHIFT,
  matchMotion,
  registerMotion
} from "@/shared/lib/motion";

import { MENU_BAR, MENU_PANEL } from "./menu-markers";

registerMotion();

/** Bar offset that closes the 4 px gap between two 2 px bars into a cross. */
const CROSS = 6;
const ITEM_STAGGER = 0.06;
/** Reduced motion: a zero-length timeline cannot be reversed, so «instant» is a millisecond. */
const INSTANT = 0.001;

const buildTimeline = (host: HTMLElement, reduced: boolean) => {
  const bars = host.querySelectorAll(`[${MENU_BAR}]`);
  const panel = host.querySelector(`[${MENU_PANEL}]`);
  const items = panel?.querySelectorAll("a, button") ?? [];
  const duration = reduced ? INSTANT : DURATION.fast;
  const timeline = gsap.timeline({
    paused: true,
    // Not autoAlpha: that hides the panel again on the first frame, dropping the focus just
    // given. The effect below shows it; closing hides it once the reverse is done.
    onReverseComplete: () => {
      gsap.set(panel, { visibility: "hidden" });
    },
    defaults: { ease: EASE.soft, duration }
  });
  timeline
    .to(bars[0], { y: CROSS, rotation: 45 }, 0)
    .to(bars[1], { opacity: 0, scaleX: 0 }, 0)
    .to(bars[2], { y: -CROSS, rotation: -45 }, 0)
    .fromTo(
      panel,
      { opacity: 0, y: -DISTANCE.small },
      { opacity: 1, y: 0, duration: reduced ? INSTANT : DURATION.base }
    )
    .fromTo(
      items,
      { opacity: 0, x: -SHIFT.row * 2 },
      { opacity: 1, x: 0, stagger: reduced ? 0 : ITEM_STAGGER },
      reduced ? 0 : DURATION.quick / 2
    );
  return timeline;
};

/**
 * The burger icon morphs into a cross, the panel fades and slides in and its
 * links stagger in; closing plays the same timeline backwards. Reduced motion
 * makes every step instant. Transforms and opacity only.
 */
export const useMenuMotion = (
  hostRef: RefObject<HTMLElement | null>,
  isOpen: boolean
): void => {
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const open = useRef(isOpen);

  useGSAP(
    () => {
      const host = hostRef.current;
      if (!host) return;
      const setup = (reduced: boolean) => () => {
        timeline.current = buildTimeline(host, reduced);
        // A rebuild (the motion preference changed) keeps an open menu open.
        if (open.current) timeline.current.progress(1);
        return () => {
          timeline.current = null;
        };
      };
      const mm = matchMotion(host, {
        full: setup(false),
        reduced: setup(true)
      });
      return () => mm.revert();
    },
    { scope: hostRef }
  );

  useEffect(() => {
    open.current = isOpen;
    if (!isOpen) {
      timeline.current?.reverse();
      return;
    }
    // Visible now, not on the next tick: the first link takes focus right after.
    const panel = hostRef.current?.querySelector(`[${MENU_PANEL}]`);
    if (panel) gsap.set(panel, { visibility: "visible" });
    timeline.current?.play();
  }, [hostRef, isOpen]);
};
