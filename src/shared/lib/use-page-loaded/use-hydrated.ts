"use client";

import { useSyncExternalStore } from "react";

const subscribe = (): (() => void) => () => undefined;

/** False on the server and while hydrating, true from the first client render after. */
export const useHydrated = (): boolean =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
