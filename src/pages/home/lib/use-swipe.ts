import type { PointerEvent } from "react";
import { useRef } from "react";

import type { Direction } from "../model";

import { swipeDirection } from "./swipe-direction";

export interface ISwipeHandlers {
  onPointerDown: (event: PointerEvent) => void;
  onPointerMove: (event: PointerEvent) => void;
  onPointerUp: (event: PointerEvent) => void;
  onPointerCancel: (event: PointerEvent) => void;
}

/** Touch and pen drags on an element as direction changes: one turn per swipe, fired as soon as the threshold is crossed. */
export const useSwipe = (
  onSwipe: (direction: Direction) => void
): ISwipeHandlers => {
  // `null` while no finger is down or once this swipe has turned.
  const origin = useRef<{ id: number; x: number; y: number } | null>(null);
  // Only the finger that started the swipe may end it; a second one is ignored.
  const end = (event: PointerEvent) => {
    if (origin.current?.id === event.pointerId) origin.current = null;
  };
  return {
    onPointerDown: event => {
      if (event.pointerType === "mouse" || origin.current) return;
      origin.current = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY
      };
    },
    onPointerMove: event => {
      const start = origin.current;
      if (!start || start.id !== event.pointerId) return;
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
