import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";

import {
  CAP,
  STAGGER,
  matchMotion,
  registerMotion,
  revealIn
} from "@/shared/lib/motion";

import { CARD_ATTR } from "./card-markers";

registerMotion();

/**
 * Cards rise in with a stagger capped by `CAP.cards`; the ones below the fold
 * (of the inner pane on desktop, of the page on mobile) wait until they scroll
 * into view. Each card is pending (hidden by CSS) until GSAP owns it.
 */
export const useCardsEntrance = (
  rootRef: RefObject<HTMLElement | null>
): void => {
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const cards = Array.from(
        root.querySelectorAll<HTMLElement>(`[${CARD_ATTR}]`)
      );
      const step = Math.min(STAGGER.children, CAP.cards / cards.length);
      const mm = matchMotion(root, {
        full: () => {
          const stops = cards.map((card, index) =>
            revealIn(card, card, false, { scroll: true, delay: index * step })
          );
          return () => stops.forEach(stop => stop?.());
        },
        reduced: () => cards.forEach(card => revealIn(card, card, true, {}))
      });
      return () => mm.revert();
    },
    { scope: rootRef }
  );
};
