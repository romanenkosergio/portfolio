import type { RefObject } from "react";
import { useEffect } from "react";

/** Share of the board that must stay visible; below it the round pauses. */
const MIN_VISIBLE = 0.5;

/** Calls `onAway` when less than half of `ref` is on screen or the tab goes hidden. */
export const useAway = (
  ref: RefObject<HTMLElement | null>,
  onAway: () => void
): void => {
  useEffect(() => {
    const node = ref.current;
    const onHidden = () => {
      if (document.hidden) onAway();
    };
    document.addEventListener("visibilitychange", onHidden);
    if (!node || typeof IntersectionObserver === "undefined") {
      return () => document.removeEventListener("visibilitychange", onHidden);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.intersectionRatio < MIN_VISIBLE) onAway();
      },
      { threshold: [0, MIN_VISIBLE] }
    );
    observer.observe(node);
    return () => {
      document.removeEventListener("visibilitychange", onHidden);
      observer.disconnect();
    };
  }, [ref, onAway]);
};
