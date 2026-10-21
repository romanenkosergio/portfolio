import type { FC } from "react";

import { useTranslations } from "next-intl";

import { E_ROUTES } from "@/shared/config";
import { Link } from "@/shared/i18n";

import Burger from "./burger";
import LanguageSwitcher from "./language-switcher";
import Navigation from "./navigation";

const Header: FC = () => {
  const t = useTranslations("header");
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border border-line bg-primary-2 p-4.5 tablet:px-5.5 desktop:static desktop:justify-start desktop:py-0">
      <Link
        title={t("homeTitle")}
        href={E_ROUTES.HOME}
        className="text-md -my-2.5 flex-none py-2.5 text-secondary-1 desktop:my-0 desktop:mr-38.5 desktop:w-38.5 desktop:py-4.5 desktop:hover:text-white"
      >
        {t("brand")}
      </Link>
      <Navigation
        className="hidden w-full desktop:flex"
        linkClassName="px-6 border-l border-l-line desktop:py-4.5 nth-3:border-r nth-3:border-r-line hover:not-aria-[current]:text-white"
        beforeLast={<LanguageSwitcher className="text-secondary-1" />}
      />
      <Burger />
    </header>
  );
};

export default Header;
