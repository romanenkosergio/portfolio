import type { FC } from "react";

import { useTranslations } from "next-intl";

import { Icon, NavLink } from "@/shared/ui";

import type { IContentLinkProps } from "./content-link.types";

const ContentLink: FC<IContentLinkProps> = ({ item }) => {
  const t = useTranslations("sidebar.items");
  const title = item.titleKey ? t(item.titleKey) : item.title;
  const linkProps = {
    isSidebar: true,
    title,
    className: "group flex cursor-pointer items-center",
    activeClass: item.activeClass
  } as const;
  const children = (
    <>
      <Icon
        name={item.icon || "markdown"}
        className="h-3.5 w-4"
        motion="colors"
        hover="light"
      />
      <span className="text-sm transition-colors duration-300 ease-in group-hover:text-white">
        {title}
      </span>
    </>
  );

  return item.external ? (
    <NavLink {...linkProps} href={item.href} isExternal>
      {children}
    </NavLink>
  ) : (
    <NavLink {...linkProps} href={item.href}>
      {children}
    </NavLink>
  );
};

export default ContentLink;
