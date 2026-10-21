import { useRef } from "react";
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

/** The tab's label slides in and fades when `label` changes (not on mount). */
export const useTabSwap = (
  textRef: RefObject<HTMLElement | null>,
  label: string
): void => {
  const previous = useRef(label);
  useGSAP(
    () => {
      const text = textRef.current;
      if (!text || previous.current === label) return;
      previous.current = label;
      const mm = matchMotion(text, {
        full: () => {
          gsap.from(text, {
            opacity: 0,
            y: SHIFT.tab,
            duration: DURATION.fast,
            ease: EASE.soft
          });
        }
      });
      return () => mm.revert();
    },
    { scope: textRef, dependencies: [label], revertOnUpdate: true }
  );
};
