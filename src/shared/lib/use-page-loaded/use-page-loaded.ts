"use client";

import { useSyncExternalStore } from "react";

const subscribe = (notify: () => void): (() => void) => {
  window.addEventListener("load", notify);
  return () => window.removeEventListener("load", notify);
};

const isLoaded = (): boolean => document.readyState === "complete";

/**
 * False on the server, during hydration and until the window `load` event;
 * true after. For work that must not compete with the first load (big lazy
 * chunks): requests it starts then fall after the largest contentful paint.
 */
export const usePageLoaded = (): boolean =>
  useSyncExternalStore(subscribe, isLoaded, () => false);
