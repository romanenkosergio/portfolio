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

interface ISlide {
  value: string;
  from?: IBox;
  to: IBox;
  done: boolean;
}

export interface ISlideIndicatorOptions {
  /** Names the indicator across mounts: its last position survives a remount. */
  id: string;
  axis: AxisType;
  /** Selector of the active item inside the host. */
  active: string;
  /** Which item is active; the indicator slides when it changes. */
  value: string;
  /** Re-measure (without a slide of its own) when these change, e.g. the tab list. */
  deps?: unknown[];
}

const memory = new Map<string, ISlide>();

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
  entry: ISlide,
  reduced: boolean
): void => {
  const { from, to } = entry;
  const finish = () => {
    entry.done = true;
  };
  gsap.set(bar, {
    opacity: 1,
    transformOrigin: "0 0",
    ...place(bar, axis, to)
  });
  if (!from || reduced || (from.pos === to.pos && from.size === to.size)) {
    finish();
    return;
  }
  gsap.from(bar, {
    ...place(bar, axis, from),
    duration: DURATION.fast,
    ease: EASE.out,
    onComplete: finish
  });
};

/**
 * One active indicator for a row/column of items: it sits under the item
 * matching `active` and slides (transform only) from the previous one when
 * `value` changes. The host usually remounts per route, so the last box is kept
 * in a module map; a run interrupted by strict mode or a revert replays from
 * the same start. The bar starts invisible and is shown once placed.
 */
export const useSlideIndicator = (
  hostRef: RefObject<HTMLElement | null>,
  barRef: RefObject<HTMLElement | null>,
  { id, axis, active, value, deps = [] }: ISlideIndicatorOptions
): void => {
  useGSAP(
    () => {
      const host = hostRef.current;
      const bar = barRef.current;
      if (!host || !bar) return;
      const to = measure(host, active, axis);
      if (!to) return;
      const last = memory.get(id);
      const replay = last?.value === value && !last.done;
      const entry: ISlide = {
        value,
        from: replay ? last.from : last?.to,
        to,
        done: false
      };
      memory.set(id, entry);
      const mm = matchMotion(host, {
        full: () => slide(bar, axis, entry, false),
        reduced: () => slide(bar, axis, entry, true)
      });
      return () => mm.revert();
    },
    { scope: hostRef, dependencies: [value, ...deps], revertOnUpdate: true }
  );
};
