"use client";

import { useEffect, useRef } from "react";
import type { FC } from "react";

import { useLocale, useTranslations } from "next-intl";

import {
  LOCALES,
  LOCALE_NAMES,
  isLocale,
  usePathname,
  useRouter
} from "@/shared/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/shared/ui/select";

import type { ILanguageSelectProps } from "./language-select.types";

// Picking a language replaces the URL with the same page in that locale.
const LanguageSelect: FC<ILanguageSelectProps> = ({
  defaultOpen,
  focusTrigger
}) => {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const label = `${t("label")}: ${isLocale(locale) ? LOCALE_NAMES[locale] : locale}`;

  // An open list takes focus itself; a closed one hands it on from the stand-in.
  useEffect(() => {
    if (focusTrigger && !defaultOpen) triggerRef.current?.focus();
  }, [focusTrigger, defaultOpen]);

  const onChange = (value: string) => {
    if (isLocale(value)) {
      router.replace(pathname, { locale: value });
    }
  };

  return (
    <Select value={locale} onValueChange={onChange} defaultOpen={defaultOpen}>
      <SelectTrigger
        ref={triggerRef}
        size="nav"
        aria-label={label}
        title={label}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper" align="end">
        {LOCALES.map(item => (
          <SelectItem
            key={item}
            value={item}
            lang={item}
            aria-label={LOCALE_NAMES[item]}
          >
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelect;
