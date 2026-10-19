import type { FC } from "react";

import { useTranslations } from "next-intl";

import { Icon } from "@/shared/ui";

import { SOCIALS } from "../config";

const Footer: FC = () => {
  const t = useTranslations("footer");
  return (
    <footer className="flex h-12.25 items-center border-t border-t-line max-tablet:justify-between">
      <span className="flex-none pl-4.5 text-secondary-1 desktop:border-r desktop:border-r-line desktop:pr-12.75">
        {t("findMeIn")}
      </span>
      <div className="flex h-full items-center desktop:w-full">
        {SOCIALS.map(item => (
          <a
            className="group flex h-full w-13 items-center justify-start border-r border-r-line px-3.5 max-tablet:first:border-l max-tablet:first:border-l-line max-tablet:last:border-r-0 desktop:last:ml-auto desktop:last:w-auto desktop:last:border-l desktop:last:border-l-line"
            key={item.titleKey}
            title={t(`socials.${item.titleKey}`)}
            href={item.href}
            target="_blank"
            rel="nofollow noreferrer"
          >
            <span className="hidden text-secondary-1 desktop:mr-1 desktop:inline-block desktop:group-hover:text-white">
              {item.label}
            </span>
            <Icon
              name={item.icon}
              className="h-6 w-6"
              tone="muted"
              hover="lightOnDesktop"
            />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
