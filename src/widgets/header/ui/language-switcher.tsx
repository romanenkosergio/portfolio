"use client";

import { useEffect, useRef, useState } from "react";
import type { FC, KeyboardEvent } from "react";

import { ChevronDownIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { LOCALE_NAMES, isLocale } from "@/shared/i18n";
import { usePageLoaded } from "@/shared/lib";
import { selectTriggerClass } from "@/shared/ui";

import type { ILanguageSelectProps } from "./language-select.types";
import type { ILanguageSwitcherProps } from "./language-switcher.types";

type LanguageSelectComponent = FC<ILanguageSelectProps>;

// A failed import is forgotten, so the next request retries.
let selectChunk: Promise<LanguageSelectComponent> | undefined;
const loadLanguageSelect = (): Promise<LanguageSelectComponent> =>
  (selectChunk ??= import("./language-select").then(
    module => module.default,
    (error: unknown) => {
      selectChunk = undefined;
      throw error;
    }
  ));

interface ILoadedSelect {
  Select: LanguageSelectComponent;
  focusTrigger: boolean;
}

const OPEN_KEYS = ["ArrowDown", "ArrowUp"];

// The Radix select is a chunk fetched once the page has loaded, so it stays out of the first
// load; until then a button of the same look stands in. Click, Enter, Space, ArrowDown or ArrowUp
// on it fetch the chunk at once and the list opens when it arrives. The swap happens once, after
// the import has resolved, and the trigger takes the focus the stand-in had. If the import
// fails, the stand-in stays a plain button and the next click tries again.
const LanguageSwitcher: FC<ILanguageSwitcherProps> = ({ className }) => {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const pageLoaded = usePageLoaded();
  const standInRef = useRef<HTMLButtonElement>(null);
  const [requests, setRequests] = useState(0);
  const [loaded, setLoaded] = useState<ILoadedSelect | null>(null);
  const label = `${t("label")}: ${isLocale(locale) ? LOCALE_NAMES[locale] : locale}`;

  useEffect(() => {
    if (loaded || !(pageLoaded || requests > 0)) return;
    let live = true;
    loadLanguageSelect().then(
      Select => {
        if (!live) return;
        const focusTrigger = document.activeElement === standInRef.current;
        setLoaded({ Select, focusTrigger });
      },
      () => undefined
    );
    return () => {
      live = false;
    };
  }, [pageLoaded, requests, loaded]);

  const ask = () => setRequests(count => count + 1);
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!OPEN_KEYS.includes(event.key)) return;
    event.preventDefault();
    ask();
  };

  if (loaded) {
    const { Select, focusTrigger } = loaded;
    return (
      <div className={className}>
        <Select defaultOpen={requests > 0} focusTrigger={focusTrigger} />
      </div>
    );
  }

  return (
    <div className={className}>
      <button
        ref={standInRef}
        type="button"
        aria-expanded="false"
        aria-haspopup="listbox"
        aria-label={label}
        title={label}
        data-slot="select-trigger"
        data-size="nav"
        className={selectTriggerClass}
        onClick={ask}
        onKeyDown={onKeyDown}
      >
        <span data-slot="select-value" style={{ pointerEvents: "none" }}>
          {locale}
        </span>
        <ChevronDownIcon aria-hidden="true" className="size-4 opacity-50" />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
