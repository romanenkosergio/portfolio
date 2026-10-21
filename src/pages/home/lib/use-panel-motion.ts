import { useRef } from "react";
import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import {
  BELOW_DESKTOP_QUERY,
  DESKTOP_QUERY,
  DISTANCE,
  DRIFT,
  DURATION,
  EASE,
  PENDING_ATTR,
  SCALE,
  matchMotion,
  registerMotion,
  revealIn
} from "@/shared/lib/motion";

import { HERO_DELAY } from "../config";

registerMotion();

const BOLTS_SELECTOR = "[data-bolt]";
const BLOBS_SELECTOR = "[data-blob]";

/** Slow, endless drift of one glow blob; `dir` mirrors the path of the other. */
const drift = (blob: Element, dir: 1 | -1): void => {
  gsap.to(blob, {
    x: DRIFT.x * dir,
    y: -DRIFT.y * dir,
    rotation: DRIFT.rotation * dir,
    duration: DRIFT.duration,
    repeat: -1,
    yoyo: true,
    ease: EASE.loop
  });
};

/**
 * Snake panel choreography: the panel rises in after the hero's code block
 * starts, the bolts spin into place, the glow blobs drift for ever. Reduced
 * motion: the panel just appears, everything is still.
 */
export const usePanelMotion = (
  scopeRef: RefObject<HTMLElement | null>,
  panelRef: RefObject<HTMLElement | null>
): void => {
  // Set once the entrance has played (or reduced motion skipped it): it never replays.
  const entered = useRef(false);

  useGSAP(
    () => {
      const scope = scopeRef.current;
      const panel = panelRef.current;
      if (!scope || !panel) return;
      const enter = (): void => {
        panel.removeAttribute(PENDING_ATTR);
        if (entered.current) return;
        gsap.from(panel, {
          opacity: 0,
          y: DISTANCE.y,
          scale: SCALE.enter,
          duration: DURATION.slow,
          delay: HERO_DELAY.panel,
          ease: EASE.out,
          onComplete: () => {
            entered.current = true;
          }
        });
        gsap.from(BOLTS_SELECTOR, {
          rotation: 360,
          scale: 0,
          opacity: 0,
          duration: DURATION.slow,
          delay: HERO_DELAY.bolts,
          stagger: DURATION.fast / 3,
          ease: EASE.out
        });
      };
      const mm = matchMotion(scope, {
        condition: DESKTOP_QUERY,
        full: () => {
          enter();
          scope
            .querySelectorAll(BLOBS_SELECTOR)
            .forEach((blob, index) => drift(blob, index === 0 ? 1 : -1));
        },
        reduced: () => {
          entered.current = true;
          panel.removeAttribute(PENDING_ATTR);
        }
      });
      // Below the fold on small screens: no hero timing, the panel rises when scrolled to.
      const below = matchMotion(scope, {
        condition: BELOW_DESKTOP_QUERY,
        full: () => revealIn(panel, panel, false, { scroll: true }),
        reduced: () => revealIn(panel, panel, true, {})
      });
      return () => {
        mm.revert();
        below.revert();
      };
    },
    { scope: scopeRef }
  );
};
