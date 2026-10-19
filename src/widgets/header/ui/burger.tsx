"use client";

import { useEffect, useId, useRef, useState } from "react";

import { useTranslations } from "next-intl";

import { cn } from "@/shared/lib";

import LanguageSwitcher from "./language-switcher";
import Navigation from "./navigation";

const BAR_CLASSES = [
  "translate-y-1.5 rotate-45",
  "opacity-0",
  "-translate-y-1.5 -rotate-45"
];

const Burger = () => {
  const t = useTranslations("header");
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? t("closeMenu") : t("openMenu")}
        className="flex cursor-pointer flex-col gap-1 desktop:hidden"
        onClick={() => setIsOpen(open => !open)}
      >
        {BAR_CLASSES.map((className, index) => (
          <span
            key={className}
            aria-hidden="true"
            className={cn(
              "h-0.5 w-4.5 transform bg-secondary-1 transition-[transform,translate,rotate,opacity] duration-300 ease-in-out",
              isOpen ? className : index === 1 && "opacity-100"
            )}
          />
        ))}
      </button>

      <div
        id={menuId}
        inert={!isOpen}
        className={cn(
          "absolute top-15.5 left-0 flex h-[calc(100dvh-62px)] w-full flex-col bg-primary-2 transition-opacity duration-700 ease-in-out",
          isOpen ? "z-10 opacity-100" : "-z-1 opacity-0"
        )}
      >
        <Navigation
          className="flex flex-col gap-5 text-white desktop:hidden"
          linkClassName="border-b-line border-b p-4.5"
          onClick={closeMenu}
          isMobile
        />
        <LanguageSwitcher className="p-4.5 text-secondary-1 desktop:hidden" />
      </div>
    </>
  );
};

export default Burger;
