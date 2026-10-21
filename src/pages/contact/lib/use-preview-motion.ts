import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import {
  DURATION,
  EASE,
  TYPE,
  matchMotion,
  registerMotion
} from "@/shared/lib/motion";

import type { FieldName } from "../config";
import { selectSending, useContactStore } from "../model";
import type { IContactEdit } from "../model";

import { pulse } from "./pulse";

registerMotion();

/**
 * Motion of the code preview, scoped to its root: the caret blinks like the hero's (solid while
 * typing, then after `TYPE.hold`), the freshly typed run fades in, and the `form.send` row pulses
 * while the message is on its way. Only the changed run is touched; React already re-rendered it.
 */
export const usePreviewMotion = (
  rootRef: RefObject<HTMLElement | null>,
  edit: IContactEdit | null,
  focused: FieldName | null
): void => {
  const sending = useContactStore(selectSending);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = matchMotion(root, {
        full: () => {
          const fresh = root.querySelector("[data-fresh]");
          const caret = root.querySelector("[data-caret]");
          if (fresh)
            gsap.from(fresh, {
              opacity: 0,
              duration: DURATION.quick,
              ease: EASE.soft,
              clearProps: "opacity"
            });
          if (caret)
            gsap.fromTo(
              caret,
              { opacity: 1 },
              {
                opacity: 0,
                duration: TYPE.blink,
                delay: TYPE.hold,
                repeat: -1,
                yoyo: true,
                ease: EASE.blink
              }
            );
        }
      });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [edit, focused], revertOnUpdate: true }
  );

  useGSAP(
    () => {
      const root = rootRef.current;
      const row = root?.querySelector("[data-preview-send]");
      if (!root || !row || !sending) return;
      const mm = matchMotion(root, { full: () => void pulse(row) });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [sending], revertOnUpdate: true }
  );
};
