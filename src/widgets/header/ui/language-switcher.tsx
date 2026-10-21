"use client";

import { Suspense, lazy, useState } from "react";
import type { FC } from "react";

import { ChevronDownIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { LOCALE_NAMES, isLocale } from "@/shared/i18n";
import { usePageLoaded } from "@/shared/lib";
import { selectTriggerClass } from "@/shared/ui";

import type { ILanguageSwitcherProps } from "./language-switcher.types";

// The Radix select is a lazy chunk fetched once the page has loaded, so it
// stays out of the first load; until it arrives a button of the same look
// stands in (a click on it asks for the select straight away).
const LanguageSelect = lazy(() => import("./language-select"));

const LanguageSwitcher: FC<ILanguageSwitcherProps> = ({ className }) => {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const loaded = usePageLoaded();
  const [asked, setAsked] = useState(false);
  const label = `${t("label")}: ${isLocale(locale) ? LOCALE_NAMES[locale] : locale}`;

  const standIn = (
    <button
      type="button"
      aria-expanded="false"
      aria-haspopup="listbox"
      aria-label={label}
      title={label}
      data-slot="select-trigger"
      data-size="nav"
      className={selectTriggerClass}
      onClick={() => setAsked(true)}
    >
      <span data-slot="select-value" style={{ pointerEvents: "none" }}>
        {locale}
      </span>
      <ChevronDownIcon aria-hidden="true" className="size-4 opacity-50" />
    </button>
  );

  return (
    <div className={className}>
      {loaded || asked ? (
        <Suspense fallback={standIn}>
          <LanguageSelect defaultOpen={asked} />
        </Suspense>
      ) : (
        standIn
      )}
    </div>
  );
};

export default LanguageSwitcher;
