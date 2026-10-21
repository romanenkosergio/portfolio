import type { PointerEvent } from "react";
import { useRef } from "react";

import type { Direction } from "../model";

import { swipeDirection } from "./swipe-direction";

export interface ISwipeHandlers {
  onPointerDown: (event: PointerEvent) => void;
  onPointerMove: (event: PointerEvent) => void;
  onPointerUp: () => void;
  onPointerCancel: () => void;
}

/** Touch and pen drags on an element as direction changes: one turn per swipe, fired as soon as the threshold is crossed. */
export const useSwipe = (
  onSwipe: (direction: Direction) => void
): ISwipeHandlers => {
  // `null` while no finger is down or once this swipe has turned.
  const origin = useRef<{ x: number; y: number } | null>(null);
  const end = () => {
    origin.current = null;
  };
  return {
    onPointerDown: event => {
      if (event.pointerType === "mouse") return;
      origin.current = { x: event.clientX, y: event.clientY };
    },
    onPointerMove: event => {
      const start = origin.current;
      if (!start) return;
      const direction = swipeDirection(
        event.clientX - start.x,
        event.clientY - start.y
      );
      if (!direction) return;
      origin.current = null;
      onSwipe(direction);
    },
    onPointerUp: end,
    onPointerCancel: end
  };
};
