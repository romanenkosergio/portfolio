import type { FC } from "react";

import { Icon, NavLink } from "@/shared/ui";

import type { IContentLinkProps } from "./content-link.types";

const ContentLink: FC<IContentLinkProps> = ({ item }) => {
  const linkProps = {
    isSidebar: true,
    title: item.title,
    className: "group flex cursor-pointer items-center gap-2 text-secondary-1",
    activeClass: item.activeClass
  } as const;
  const children = (
    <>
      <Icon
        name={item.icon || "markdown"}
        className="h-3.5 w-4 transition-colors duration-300 ease-in group-hover:text-white"
      />
      <span className="text-sm transition-colors duration-300 ease-in group-hover:text-white">
        {item.title}
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
