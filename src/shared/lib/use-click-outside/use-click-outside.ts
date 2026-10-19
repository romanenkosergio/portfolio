"use client";

import type { RefObject } from "react";
import { useEffect } from "react";

import type { UserEventType } from "./use-click-outside.types";

// Helper function to determine if the event target is outside the provided refs
const isEventOutsideRef = <T extends HTMLElement>(
  refs: RefObject<T> | RefObject<T>[],
  target: Node
): boolean => {
  if (!target || !target.isConnected) return false;

  const refList = Array.isArray(refs) ? refs : [refs];
  return refList
    .filter(ref => Boolean(ref.current))
    .every(ref => ref.current && !ref.current.contains(target));
};

// Hook: Detects events outside specified elements and triggers a handler
export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  refs: RefObject<T> | RefObject<T>[],
  onOutsideClick: (event: MouseEvent | TouchEvent | FocusEvent) => void,
  eventType: UserEventType = "mousedown"
): void => {
  useEffect(() => {
    const eventListener = (event: MouseEvent | TouchEvent | FocusEvent) => {
      const target = event.target as Node;
      if (isEventOutsideRef(refs, target)) {
        onOutsideClick(event);
      }
    };

    document.addEventListener(eventType, eventListener);

    return () => {
      document.removeEventListener(eventType, eventListener);
    };
  }, [refs, onOutsideClick, eventType]);
};
