import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import {
  DURATION,
  EASE,
  SHIFT,
  matchMotion,
  registerMotion
} from "@/shared/lib/motion";

registerMotion();

/** Shakes the fields marked invalid, sideways by a few px, each time `rejected` grows (a failed submit, not a network error). */
export const useFieldShake = (
  rootRef: RefObject<HTMLElement | null>,
  rejected: number
): void => {
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || rejected === 0) return;
      const mm = matchMotion(root, {
        full: () => {
          const fields = root.querySelectorAll('[aria-invalid="true"]');
          gsap.to(fields, {
            keyframes: {
              x: [-SHIFT.shake, SHIFT.shake, -SHIFT.shake / 2, 0],
              easeEach: EASE.inOut
            },
            duration: DURATION.fast,
            onComplete: () => void gsap.set(fields, { clearProps: "transform" })
          });
        }
      });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [rejected], revertOnUpdate: true }
  );
};
