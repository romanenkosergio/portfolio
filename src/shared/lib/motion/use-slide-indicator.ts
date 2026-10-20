import { useRef } from "react";
import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { matchMotion } from "./reduced-motion";
import { DURATION, EASE } from "./tokens";

type AxisType = "x" | "y";

interface IBox {
  pos: number;
  size: number;
}

export interface ISlideIndicatorOptions {
  axis: AxisType;
  /** Selector of the active item inside the host. */
  active: string;
  /** Which item is active; the indicator slides when it changes. */
  value: string;
  /** Re-measure (the indicator follows without a slide of its own) when these change, e.g. the tab list. */
  deps?: unknown[];
}

const measure = (host: HTMLElement, active: string, axis: AxisType) => {
  const item = host.querySelector(active);
  if (!item) return undefined;
  const box = item.getBoundingClientRect();
  const origin = host.getBoundingClientRect();
  const horizontal = axis === "x";
  const size = horizontal ? box.width : box.height;
  if (size === 0) return undefined;
  return {
    pos: horizontal ? box.left - origin.left : box.top - origin.top,
    size
  };
};

/** The bar is 1px along `axis` and a fixed width across it; position is `x`/`y`, length is `scale`. */
const place = (bar: HTMLElement, axis: AxisType, { pos, size }: IBox) =>
  axis === "x" ? { x: pos, scaleX: size } : { y: pos, scaleY: size };

const slide = (
  bar: HTMLElement,
  axis: AxisType,
  from: IBox | undefined,
  to: IBox,
  reduced: boolean
): void => {
  gsap.set(bar, {
    opacity: 1,
    transformOrigin: "0 0",
    ...place(bar, axis, to)
  });
  if (!from || reduced || (from.pos === to.pos && from.size === to.size))
    return;
  gsap.from(bar, {
    ...place(bar, axis, from),
    duration: DURATION.fast,
    ease: EASE.out
  });
};

/**
 * One active indicator for a row/column of items: it sits under the item
 * matching `active` and slides (transform only) from the previous one when
 * `value` changes. The host must persist across the change (a layout), the
 * last box lives in a ref. It follows the host's resizes and the web fonts
 * arriving, and waits (invisible) while the item has no size yet. The host
 * gets `data-ready` once the bar is placed, so a static fallback can step aside.
 */
export const useSlideIndicator = (
  hostRef: RefObject<HTMLElement | null>,
  barRef: RefObject<HTMLElement | null>,
  { axis, active, value, deps = [] }: ISlideIndicatorOptions
): void => {
  const last = useRef<IBox>(undefined);

  useGSAP(
    () => {
      const host = hostRef.current;
      const bar = barRef.current;
      if (!host || !bar) return;
      const move = (reduced: boolean) => {
        const to = measure(host, active, axis);
        if (!to) return;
        slide(bar, axis, last.current, to, reduced);
        last.current = to;
        host.setAttribute("data-ready", "");
      };
      const mm = matchMotion(host, {
        full: () => move(false),
        reduced: () => move(true)
      });
      // Resizes and late fonts move the item without a value change: follow, no slide.
      const follow = () => {
        const to = measure(host, active, axis);
        if (!to || gsap.isTweening(bar)) return;
        last.current = to;
        gsap.set(bar, { opacity: 1, ...place(bar, axis, to) });
        host.setAttribute("data-ready", "");
      };
      const observer = new ResizeObserver(follow);
      observer.observe(host);
      void document.fonts.ready.then(follow);
      return () => {
        observer.disconnect();
        mm.revert();
      };
    },
    { scope: hostRef, dependencies: [value, ...deps], revertOnUpdate: true }
  );
};
