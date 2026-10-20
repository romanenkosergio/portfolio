import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import {
  DURATION,
  EASE,
  SHIFT,
  matchMotion,
  useSlideIndicator
} from "@/shared/lib/motion";

import type { AboutType } from "@/pages/about/config";

// Tabs that already entered this visit: the bar remounts per file, so it is kept here.
const entered = new Set<AboutType>();

// A tab opened after the first one fades in from above; the first (or any, under reduced motion) just appears.
const enterTab = (list: HTMLElement, current: AboutType, reduced: boolean) => {
  const tab = list.querySelector(`[data-tab="${current}"]`);
  if (!tab || entered.has(current)) return;
  const first = entered.size === 0;
  if (first || reduced) {
    entered.add(current);
    return;
  }
  gsap.from(tab, {
    opacity: 0,
    y: -SHIFT.tab,
    duration: DURATION.fast,
    ease: EASE.soft,
    onComplete: () => {
      entered.add(current);
    }
  });
};

/** The underline slides to the current tab; a newly opened tab fades in. */
export const useTabMotion = (current: AboutType, count: number) => {
  const listRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLLIElement>(null);

  useSlideIndicator(listRef, barRef, {
    id: "tabs",
    axis: "x",
    active: "[aria-current]",
    value: current,
    deps: [count]
  });

  useGSAP(
    () => {
      const list = listRef.current;
      if (!list) return;
      const mm = matchMotion(list, {
        full: () => enterTab(list, current, false),
        reduced: () => enterTab(list, current, true)
      });
      return () => mm.revert();
    },
    { scope: listRef, dependencies: [current] }
  );

  return { listRef, barRef };
};
