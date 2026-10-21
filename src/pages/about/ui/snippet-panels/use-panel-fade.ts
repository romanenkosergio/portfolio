import { useRef, useState } from "react";
import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import {
  DISTANCE,
  DURATION,
  EASE,
  matchMotion,
  registerMotion
} from "@/shared/lib/motion";

registerMotion();

const panelOf = (host: HTMLElement, key: string) =>
  host.querySelector<HTMLElement>(`[data-panel="${key}"]`);

/**
 * Cross-fades the panel on screen into the one of `active`: the old one fades out, then the
 * returned `shown` swaps and the new one fades and lifts in. Reduced motion swaps at once.
 */
export const usePanelFade = <T extends string>(
  hostRef: RefObject<HTMLElement | null>,
  active: T
) => {
  const [shown, setShown] = useState(active);
  const entered = useRef(shown);

  useGSAP(
    () => {
      const host = hostRef.current;
      if (!host) return;
      if (shown !== active) {
        const mm = matchMotion(host, {
          full: () => {
            gsap.to(panelOf(host, shown), {
              opacity: 0,
              duration: DURATION.quick / 2,
              ease: EASE.soft,
              onComplete: () => setShown(active)
            });
          },
          reduced: () => {
            gsap.delayedCall(0, () => setShown(active));
          }
        });
        return () => mm.revert();
      }
      if (entered.current === shown) return;
      entered.current = shown;
      const mm = matchMotion(host, {
        full: () => {
          gsap.fromTo(
            panelOf(host, shown),
            { opacity: 0, y: DISTANCE.small },
            {
              opacity: 1,
              y: 0,
              duration: DURATION.fast,
              ease: EASE.soft,
              clearProps: "opacity,transform"
            }
          );
        }
      });
      return () => mm.revert();
    },
    { scope: hostRef, dependencies: [active, shown], revertOnUpdate: true }
  );

  return shown;
};
