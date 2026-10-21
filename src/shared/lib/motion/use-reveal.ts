import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";

import { loadScrambleText, playAfterLoad } from "./load-plugins";
import { matchMotion } from "./reduced-motion";
import { revealIn } from "./reveal-in";
import type { IRevealInOptions } from "./reveal-in";

interface IUseRevealOptions extends IRevealInOptions {
  /** Animate the elements matching this selector inside the host; the host itself by default. */
  selector?: string;
  /** Animate the host's direct children instead of the host. */
  children?: boolean;
  /** Start only once the text plugins have loaded, so the entrance never beats text that waits for them (the hero). */
  afterLoad?: boolean;
}

/** Reveals the host (or its items) with the reduced-motion guard; reverts on unmount. */
export const useReveal = (
  ref: RefObject<HTMLElement | null>,
  {
    selector,
    children = false,
    afterLoad = false,
    ...options
  }: IUseRevealOptions
): void => {
  useGSAP(
    () => {
      const host = ref.current;
      if (!host) return;
      let targets: gsap.TweenTarget = host;
      if (selector) targets = host.querySelectorAll(selector);
      else if (children) targets = host.children;
      const mm = matchMotion(host, {
        full: contextSafe =>
          afterLoad
            ? playAfterLoad(
                loadScrambleText,
                () => revealIn(host, targets, false, options),
                contextSafe
              )
            : revealIn(host, targets, false, options),
        reduced: () => revealIn(host, targets, true, options)
      });
      return () => mm.revert();
    },
    { scope: ref }
  );
};
