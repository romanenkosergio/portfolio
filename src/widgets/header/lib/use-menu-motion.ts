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

const buildTimeline = (host: HTMLElement, reduced: boolean) => {
  const bars = host.querySelectorAll(`[${MENU_BAR}]`);
  const panel = host.querySelector(`[${MENU_PANEL}]`);
  const items = panel?.querySelectorAll("a, button") ?? [];
  const duration = reduced ? 0 : DURATION.fast;
  const timeline = gsap.timeline({
    paused: true,
    defaults: { ease: EASE.soft, duration }
  });
  timeline
    .to(bars[0], { y: CROSS, rotation: 45 }, 0)
    .to(bars[1], { opacity: 0, scaleX: 0 }, 0)
    .to(bars[2], { y: -CROSS, rotation: -45 }, 0)
    .fromTo(
      panel,
      { opacity: 0, y: -DISTANCE.small },
      { opacity: 1, y: 0, duration: reduced ? 0 : DURATION.base }
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

  useGSAP(
    () => {
      const host = hostRef.current;
      if (!host) return;
      const setup = (reduced: boolean) => () => {
        timeline.current = buildTimeline(host, reduced);
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
    if (isOpen) timeline.current?.play();
    else timeline.current?.reverse();
  }, [isOpen]);
};
