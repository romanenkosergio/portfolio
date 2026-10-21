import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";

import {
  CAP,
  DISTANCE,
  DURATION,
  STAGGER,
  matchMotion,
  registerMotion,
  revealIn
} from "@/shared/lib/motion";

registerMotion();

/**
 * The form's fields and the submit row rise in one after another (the whole set within
 * `CAP.fields`). Runs again when the form returns (`shown`), after «send new message».
 */
export const useFormEntrance = (
  rootRef: RefObject<HTMLElement | null>,
  shown: boolean
): void => {
  useGSAP(
    () => {
      const form = rootRef.current?.querySelector("form");
      if (!form || !shown) return;
      const rows = Array.from(form.children);
      const options = {
        duration: DURATION.base,
        y: DISTANCE.small,
        stagger: Math.min(STAGGER.children, CAP.fields / rows.length),
        clearProps: "opacity,transform"
      };
      const mm = matchMotion(form, {
        full: () => revealIn(form, rows, false, options),
        reduced: () => revealIn(form, rows, true, options)
      });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [shown], revertOnUpdate: true }
  );
};
