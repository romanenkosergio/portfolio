import { useEffect, useRef } from "react";
import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Flip } from "gsap/Flip";

import { usePageLoaded } from "@/shared/lib";
import {
  CAP,
  DURATION,
  EASE,
  SCALE,
  STAGGER,
  loadFlip,
  matchMotion
} from "@/shared/lib/motion";

import { CARD_ATTR, EMPTY_ATTR } from "./card-markers";

const cardsOf = (root: HTMLElement): HTMLElement[] =>
  Array.from(root.querySelectorAll<HTMLElement>(`[${CARD_ATTR}]`));

const isShown = (card: HTMLElement): boolean =>
  getComputedStyle(card).display !== "none";

/** Ends every tween on the cards and strips what Flip and the entrance left inline, so each flip starts and ends clean. */
const settle = (root: HTMLElement): void => {
  const cards = cardsOf(root);
  gsap.getTweensOf(cards).forEach(tween => tween.progress(1).kill());
  gsap.set(cards, { clearProps: "all" });
};

const glide = (
  plugin: typeof Flip,
  root: HTMLElement,
  state: Flip.FlipState
): gsap.core.Timeline => {
  const cards = cardsOf(root);
  const shown = cards.filter(isShown);
  const hide = { opacity: 0, scale: SCALE.enter };
  const glided = plugin.from(state, {
    targets: cards,
    duration: DURATION.base,
    ease: EASE.out,
    stagger: Math.min(STAGGER.chars, CAP.cards / Math.max(shown.length, 1)),
    absoluteOnLeave: true,
    onComplete: () => settle(root),
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
        ease: EASE.soft
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
  return glided;
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
  const flip = useRef<typeof Flip | null>(null);

  // Flip stays out of the first load; it is fetched once the page has loaded.
  // Until it arrives (or if it fails) a filter change simply re-lays out at once.
  const loaded = usePageLoaded();
  useEffect(() => {
    if (!loaded) return;
    void loadFlip().then(
      plugin => {
        flip.current = plugin;
      },
      () => undefined
    );
  }, [loaded]);

  useGSAP(
    () => {
      const root = rootRef.current;
      const captured = state.current;
      state.current = null;
      if (!root || !captured) return;
      const mm = matchMotion(root, {
        full: () => {
          if (flip.current)
            running.current = glide(flip.current, root, captured);
        }
      });
      return () => {
        settle(root);
        mm.revert();
        settle(root);
      };
    },
    { scope: rootRef, dependencies: [filter], revertOnUpdate: true }
  );

  return () => {
    const root = rootRef.current;
    if (!root || !flip.current) return;
    // Settle the running flip and any entrance still waiting for scroll, so the capture is final.
    running.current?.progress(1).kill();
    running.current = null;
    settle(root);
    state.current = flip.current.getState(cardsOf(root));
  };
};
