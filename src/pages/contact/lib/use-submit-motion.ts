import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import {
  DURATION,
  EASE,
  SCALE,
  SHIFT,
  matchMotion,
  registerMotion
} from "@/shared/lib/motion";

import type { FormStatus } from "../config";

import { pulse } from "./pulse";

registerMotion();

export const STATUS_ATTR = "data-status";

/**
 * The submit row: the button is pressed when sending starts and its label pulses until the
 * answer comes; the status text slides in whenever it changes (sending, failure).
 */
export const useSubmitMotion = (
  rootRef: RefObject<HTMLElement | null>,
  status: FormStatus,
  attempt: number
): void => {
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = matchMotion(root, {
        full: () => {
          const button = root.querySelector("button");
          const label = button?.firstElementChild;
          const note = root.querySelector(`[${STATUS_ATTR}]`);
          if (note && status !== "idle")
            gsap.from(note, {
              opacity: 0,
              y: SHIFT.note,
              duration: DURATION.fast,
              ease: EASE.soft
            });
          if (status !== "sending" || !button || !label) return;
          gsap.from(button, {
            scale: SCALE.press,
            duration: DURATION.fast,
            ease: EASE.out
          });
          pulse(label);
        }
      });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [status, attempt], revertOnUpdate: true }
  );
};
