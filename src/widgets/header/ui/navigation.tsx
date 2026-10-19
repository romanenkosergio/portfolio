import { Fragment } from "react";
import type { FC } from "react";

import { useTranslations } from "next-intl";

import { NavLink } from "@/shared/ui";

import { NAV_ITEMS } from "../config";

import type { INavigationProps } from "./navigation.types";

const Navigation: FC<INavigationProps> = ({
  className,
  linkClassName,
  isMobile,
  beforeLast,
  onClick
}) => {
  const t = useTranslations("header.nav");
  return (
    <nav className={className}>
      {NAV_ITEMS.map((item, index) => (
        <Fragment key={`${item.key}-${isMobile ? "mobile" : "desktop"}`}>
          {beforeLast && index === NAV_ITEMS.length - 1 && (
            <div className="ml-auto flex items-center px-3">{beforeLast}</div>
          )}
          <NavLink
            onClick={onClick}
            href={item.href}
            title={t(`${item.key}.title`)}
            className={linkClassName}
            exact={item.exact}
          >
            {t(`${item.key}.label`)}
          </NavLink>
        </Fragment>
      ))}
    </nav>
  );
};

export default Navigation;
