import type { MutableRefObject, RefObject } from "react";
import { useEffect, useRef } from "react";

/** Whether `ref` is on screen, as a ref the game loop can read each tick without re-rendering. */
export const useOnScreen = (
  ref: RefObject<HTMLElement | null>
): MutableRefObject<boolean> => {
  const onScreen = useRef(true);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      onScreen.current = entry?.isIntersecting ?? true;
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
  return onScreen;
};
