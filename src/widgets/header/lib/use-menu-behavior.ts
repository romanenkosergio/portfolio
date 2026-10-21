import { useEffect } from "react";
import type { RefObject } from "react";

import { DESKTOP_QUERY } from "@/shared/lib/motion";

import { MENU_PANEL } from "./menu-markers";

const FOCUSABLE = "a[href], button:not([disabled])";

/** Tab wraps between the burger and the last control of the panel. */
const trapTab = (host: HTMLElement, event: KeyboardEvent): void => {
  const target = event.target;
  if (!(target instanceof Node) || !host.contains(target)) return;
  const controls = Array.from(host.querySelectorAll<HTMLElement>(FOCUSABLE));
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && target === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && target === last) {
    event.preventDefault();
    first?.focus();
  }
};

/**
 * While the menu is open: the page behind does not scroll, Tab stays inside
 * the burger and the panel, Esc and a widening to the desktop layout close it,
 * focus moves to the first link and returns to the burger when it closes.
 */
export const useMenuBehavior = (
  hostRef: RefObject<HTMLElement | null>,
  buttonRef: RefObject<HTMLButtonElement | null>,
  isOpen: boolean,
  close: () => void
): void => {
  useEffect(() => {
    const host = hostRef.current;
    if (!isOpen || !host) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    host.querySelector<HTMLElement>(`[${MENU_PANEL}] a`)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") trapTab(host, event);
      // A Select inside the panel closes first (it prevents the default).
      else if (event.key === "Escape" && !event.defaultPrevented) close();
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) close();
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    const button = buttonRef.current;
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
      button?.focus();
    };
  }, [hostRef, buttonRef, isOpen, close]);
};
