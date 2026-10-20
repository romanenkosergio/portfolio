import { useRef } from "react";
import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { matchMotion } from "./reduced-motion";
import { CAP, DURATION, EASE } from "./tokens";

/** Markers the host's markup carries: the folding panel and, optionally, the arrow that turns. */
export const FOLD_PANEL = "data-fold-panel";
export const FOLD_ARROW = "data-fold-arrow";

export interface IFoldOptions {
  /** Stagger the panel's direct children instead of the panel (file rows). */
  children?: boolean;
  /** Offset the entrance comes from. */
  x?: number;
  y?: number;
}

const fold = (
  host: HTMLElement,
  open: boolean,
  reduced: boolean,
  { children = false, x = 0, y = 0 }: IFoldOptions
): void => {
  const panel = host.querySelector<HTMLElement>(`[${FOLD_PANEL}]`);
  if (!panel) return;
  const targets = children ? Array.from(panel.children) : [panel];
  const arrow = host.querySelector(`[${FOLD_ARROW}]`);
  if (arrow) {
    const [from, to] = open ? [-90, 0] : [0, -90];
    gsap.fromTo(
      arrow,
      { rotation: reduced ? to : from },
      { rotation: to, duration: DURATION.quick, ease: EASE.soft }
    );
  }
  if (reduced) {
    panel.hidden = !open;
    return;
  }
  if (open) {
    panel.hidden = false;
    gsap.fromTo(
      targets,
      { opacity: 0, x, y },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: DURATION.fast,
        ease: EASE.soft,
        stagger: Math.min(0.04, CAP.files / targets.length),
        clearProps: "opacity,transform"
      }
    );
    return;
  }
  // Hidden only once faded: the panel must not stay focusable, nor vanish abruptly.
  gsap.to(targets, {
    opacity: 0,
    duration: DURATION.quick / 2,
    ease: EASE.soft,
    onComplete: () => {
      panel.hidden = true;
    }
  });
};

/**
 * Animates a fold/unfold of the `[data-fold-panel]` inside `hostRef` when
 * `open` changes (not on mount): the arrow turns, the panel (or its rows) fades
 * and shifts in, and on close fades out before it gets `hidden`. No height is
 * animated. The panel's `hidden` attribute belongs to this hook after mount.
 */
export const useFold = (
  hostRef: RefObject<HTMLElement | null>,
  open: boolean,
  options: IFoldOptions = {}
): void => {
  const previous = useRef(open);
  useGSAP(
    () => {
      const host = hostRef.current;
      if (!host || previous.current === open) return;
      previous.current = open;
      const mm = matchMotion(host, {
        full: () => fold(host, open, false, options),
        reduced: () => fold(host, open, true, options)
      });
      return () => mm.revert();
    },
    { scope: hostRef, dependencies: [open], revertOnUpdate: true }
  );
};
