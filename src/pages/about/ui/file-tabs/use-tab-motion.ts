import { useRef } from "react";
import type { RefObject } from "react";

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

/** Fades in the tabs that were not in the bar on the previous run. */
const enterTabs = (list: HTMLElement, added: AboutType[]) => {
  const tabs = added.flatMap(
    type => list.querySelector(`[data-tab="${type}"]`) ?? []
  );
  gsap.from(tabs, {
    opacity: 0,
    y: -SHIFT.tab,
    duration: DURATION.fast,
    ease: EASE.soft
  });
};

/**
 * The underline slides to the current tab (and follows tabs that shift); a tab
 * added after the first render fades in. Returns the underline's ref.
 */
export const useTabMotion = (
  listRef: RefObject<HTMLUListElement | null>,
  current: AboutType,
  shown: AboutType[]
) => {
  const barRef = useRef<HTMLLIElement>(null);
  const previous = useRef<AboutType[] | null>(null);

  useSlideIndicator(listRef, barRef, {
    axis: "x",
    active: "[aria-current]",
    value: current,
    deps: [shown.join()]
  });

  useGSAP(
    () => {
      const list = listRef.current;
      const before = previous.current;
      previous.current = shown;
      if (!list || !before) return;
      const added = shown.filter(type => !before.includes(type));
      if (added.length === 0) return;
      const mm = matchMotion(list, { full: () => enterTabs(list, added) });
      return () => mm.revert();
    },
    { scope: listRef, dependencies: [shown.join()] }
  );

  return barRef;
};
