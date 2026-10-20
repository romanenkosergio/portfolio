import { useEffect, useRef } from "react";
import type { RefObject } from "react";

import { useRouter, usePathname } from "@/shared/i18n";
import { exitOut } from "@/shared/lib/motion";

import {
  ABOUT_TYPE_ROUTES,
  DEFAULT_ABOUT_TYPE,
  type AboutType
} from "@/pages/about/config";
import { aboutTypeOf } from "@/pages/about/lib";
import {
  selectClose,
  selectOpen,
  selectTabs,
  useTabsStore
} from "@/pages/about/model";

/**
 * The open tabs and what closing one does: the tab leaves with an exit, then
 * the store drops it and, if it was on screen, the router goes to its
 * neighbour. Focus lands on the active tab afterwards, never on <body>.
 */
export const useTabs = (listRef: RefObject<HTMLUListElement | null>) => {
  const router = useRouter();
  const current = aboutTypeOf(usePathname());
  const tabs = useTabsStore(selectTabs);
  const open = useTabsStore(selectOpen);
  const close = useTabsStore(selectClose);
  const cancelExit = useRef<(() => void) | null>(null);
  const refocus = useRef(false);
  // Before the first effect the store is empty: the file on screen is the only tab.
  const shown = tabs.length === 0 ? [current] : tabs;

  useEffect(() => open(current), [current, open]);

  useEffect(() => {
    if (!refocus.current) return;
    const active =
      listRef.current?.querySelector<HTMLElement>("a[aria-current]");
    if (!active) return;
    refocus.current = false;
    active.focus();
  }, [current, shown.length, listRef]);

  useEffect(() => () => cancelExit.current?.(), []);

  const abortClose = () => {
    cancelExit.current?.();
    cancelExit.current = null;
  };

  const closeTab = (type: AboutType) => {
    const tab = listRef.current?.querySelector(`[data-tab="${type}"]`);
    abortClose();
    cancelExit.current = exitOut(tab ?? null, () => {
      cancelExit.current = null;
      refocus.current = true;
      const next = close(type);
      if (type === current) {
        router.push(ABOUT_TYPE_ROUTES[next ?? DEFAULT_ABOUT_TYPE]);
      }
    });
  };

  return { current, shown, closeTab, abortClose };
};
