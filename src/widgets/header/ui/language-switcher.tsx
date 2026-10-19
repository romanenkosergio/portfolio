"use client";

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
} from "@/shared/ui";

import type { ILanguageSwitcherProps } from "./language-switcher.types";

// Picking a language replaces the URL with the same page in that locale.
const LanguageSwitcher: FC<ILanguageSwitcherProps> = ({ className }) => {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const label = `${t("label")}: ${isLocale(locale) ? LOCALE_NAMES[locale] : locale}`;

  const onChange = (value: string) => {
    if (isLocale(value)) {
      router.replace(pathname, { locale: value });
    }
  };

  return (
    <div className={className}>
      <Select value={locale} onValueChange={onChange}>
        <SelectTrigger size="nav" aria-label={label} title={label}>
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
    </div>
  );
};

export default LanguageSwitcher;
