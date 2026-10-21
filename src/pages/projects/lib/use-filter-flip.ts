import { useRef } from "react";
import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

import {
  CAP,
  DURATION,
  EASE,
  SCALE,
  STAGGER,
  matchMotion,
  registerFlip
} from "@/shared/lib/motion";

import { CARD_ATTR, EMPTY_ATTR } from "./card-markers";

registerFlip();

const cardsOf = (root: HTMLElement): HTMLElement[] =>
  Array.from(root.querySelectorAll<HTMLElement>(`[${CARD_ATTR}]`));

const isShown = (card: HTMLElement): boolean =>
  getComputedStyle(card).display !== "none";

const glide = (
  root: HTMLElement,
  state: Flip.FlipState
): gsap.core.Timeline => {
  const cards = cardsOf(root);
  const shown = cards.filter(isShown);
  const hide = { opacity: 0, scale: SCALE.enter };
  const flip = Flip.from(state, {
    targets: shown,
    duration: DURATION.base,
    ease: EASE.out,
    stagger: Math.min(STAGGER.chars, CAP.cards / Math.max(shown.length, 1)),
    absoluteOnLeave: true,
    onEnter: entering =>
      gsap.fromTo(entering, hide, {
        opacity: 1,
        scale: 1,
        duration: DURATION.base,
        ease: EASE.out,
        clearProps: "opacity,transform"
      }),
    onLeave: leaving =>
      gsap.to(leaving, {
        ...hide,
        duration: DURATION.fast,
        ease: EASE.soft,
        clearProps: "opacity,transform"
      })
  });
  const empty = root.querySelector(`[${EMPTY_ATTR}]`);
  if (empty) {
    gsap.from(empty, {
      opacity: 0,
      duration: DURATION.base,
      ease: EASE.out
    });
  }
  return flip;
};

/**
 * Cards glide to their new places when the filter changes. Call the returned
 * `capture` right before the state update; once React has rendered, the cards
 * that stay glide, entering ones fade and scale up, leaving ones the reverse
 * (absolute, so they do not hold the layout). A second change completes the
 * running flip first. Reduced motion changes the layout at once.
 */
export const useFilterFlip = (
  rootRef: RefObject<HTMLElement | null>,
  filter: unknown
): (() => void) => {
  const state = useRef<Flip.FlipState | null>(null);
  const running = useRef<gsap.core.Animation | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const captured = state.current;
      state.current = null;
      if (!root || !captured) return;
      const mm = matchMotion(root, {
        full: () => {
          running.current = glide(root, captured);
        }
      });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [filter], revertOnUpdate: true }
  );

  return () => {
    const root = rootRef.current;
    if (!root) return;
    // Settle the running flip and any entrance still waiting for scroll, so the capture is final.
    running.current?.progress(1);
    running.current = null;
    gsap.getTweensOf(cardsOf(root)).forEach(tween => tween.progress(1));
    state.current = Flip.getState(cardsOf(root).filter(isShown));
  };
};
