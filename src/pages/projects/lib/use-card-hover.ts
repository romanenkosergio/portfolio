import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import {
  DURATION,
  EASE,
  HOVER,
  matchMotion,
  registerMotion
} from "@/shared/lib/motion";

import { COVER_LOGO_ATTR, COVER_PATTERN_ATTR } from "@/entities/project/config";

import { CARD_ATTR } from "./card-markers";

registerMotion();

const rise = (card: HTMLElement, raised: boolean): void => {
  const options = { duration: DURATION.fast, ease: EASE.soft, overwrite: true };
  gsap.to(card, { y: raised ? -HOVER.lift : 0, ...options });
  gsap.to(card.querySelectorAll("svg circle"), {
    scale: raised ? HOVER.glow : 1,
    x: raised ? HOVER.drift : 0,
    transformOrigin: "50% 50%",
    ...options
  });
  gsap.to(card.querySelectorAll(`[${COVER_PATTERN_ATTR}]`), {
    x: raised ? -HOVER.drift * 2 : 0,
    ...options
  });
  gsap.to(card.querySelectorAll(`[${COVER_LOGO_ATTR}]`), {
    x: raised ? HOVER.drift : 0,
    scale: raised ? HOVER.glow : 1,
    transformOrigin: "50% 50%",
    ...options
  });
};

const bind = (wrapper: HTMLElement): (() => void) | undefined => {
  const card = wrapper.firstElementChild;
  if (!(card instanceof HTMLElement)) return;
  const enter = () => rise(card, true);
  const leave = () => rise(card, false);
  const blur = (event: FocusEvent) => {
    if (!card.contains(event.relatedTarget as Node | null)) leave();
  };
  card.addEventListener("pointerenter", enter);
  card.addEventListener("pointerleave", leave);
  card.addEventListener("focusin", enter);
  card.addEventListener("focusout", blur);
  return () => {
    card.removeEventListener("pointerenter", enter);
    card.removeEventListener("pointerleave", leave);
    card.removeEventListener("focusin", enter);
    card.removeEventListener("focusout", blur);
  };
};

/**
 * On hover and keyboard focus a card lifts, its cover's glows drift and
 * swell, the pattern slides and the logo leans in (parallax) (transforms only; the border colour is CSS). Pointer devices with
 * motion allowed only: touch and reduced motion get the colour change alone.
 */
export const useCardHover = (rootRef: RefObject<HTMLElement | null>): void => {
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = matchMotion(root, {
        condition: "(hover: hover)",
        full: () => {
          const unbind = Array.from(
            root.querySelectorAll<HTMLElement>(`[${CARD_ATTR}]`)
          ).map(bind);
          return () => unbind.forEach(off => off?.());
        }
      });
      return () => mm.revert();
    },
    { scope: rootRef }
  );
};
