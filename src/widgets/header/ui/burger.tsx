"use client";

import { useCallback, useId, useRef, useState } from "react";

import { useTranslations } from "next-intl";

import { usePathname } from "@/shared/i18n";

import { MENU_BAR, MENU_PANEL, useMenuBehavior, useMenuMotion } from "../lib";

import LanguageSwitcher from "./language-switcher";
import Navigation from "./navigation";

const BARS = [0, 1, 2];

// Below `desktop`: the burger opens a full-screen list of the pages and the language switcher.
const Burger = () => {
  const t = useTranslations("header");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const menuId = useId();
  const hostRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setIsOpen(false), []);

  // Navigating (a link, the browser's back button) closes the menu.
  if (openedAt !== pathname) {
    setOpenedAt(pathname);
    setIsOpen(false);
  }

  // The motion effect runs first: the panel is visible before focus moves into it.
  useMenuMotion(hostRef, isOpen);
  useMenuBehavior(hostRef, buttonRef, isOpen, close);

  return (
    <div ref={hostRef} className="desktop:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? t("closeMenu") : t("openMenu")}
        title={isOpen ? t("closeMenu") : t("openMenu")}
        className="-my-2.5 -mr-3.5 flex size-11 cursor-pointer flex-col items-center justify-center gap-1 focus-visible:outline-2 focus-visible:outline-accent-1"
        onClick={() => setIsOpen(open => !open)}
      >
        {BARS.map(bar => (
          <span
            key={bar}
            aria-hidden="true"
            {...{ [MENU_BAR]: "" }}
            className="h-0.5 w-4.5 bg-secondary-1"
          />
        ))}
      </button>

      <div
        id={menuId}
        inert={!isOpen}
        {...{ [MENU_PANEL]: "" }}
        className="invisible absolute top-full -left-px flex h-[calc(100dvh-100%)] w-[calc(100%+2px)] flex-col overflow-y-auto bg-primary-2 opacity-0"
      >
        <Navigation
          className="flex flex-col text-white"
          linkClassName="border-b-line border-b p-4.5"
          onClick={close}
          isMobile
        />
        <LanguageSwitcher className="p-4.5 text-secondary-1" />
      </div>
    </div>
  );
};

export default Burger;
