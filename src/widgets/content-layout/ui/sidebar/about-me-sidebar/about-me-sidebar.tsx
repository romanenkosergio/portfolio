import type { FC } from "react";

import { Icon, NavLink } from "@/shared/ui";

import {
  ABOUT_ME_NAVIGATION,
  ABOUT_ME_PERSONAL_ITEMS,
  ABOUT_ME_PROFESSIONAL_ITEMS
} from "@/widgets/content-layout/config";
import type { IContentItem } from "@/widgets/content-layout/config";

import { SidebarContentItem } from "../sidebar-content-item";

import type { IAboutMeSidebarProps } from "./about-me-sidebar.types";

const SIDEBAR_ITEMS = {
  "personal-info": ABOUT_ME_PERSONAL_ITEMS,
  "professional-info": ABOUT_ME_PROFESSIONAL_ITEMS,
  "hobbies": []
};

const ContentLink: FC<{ item: IContentItem }> = ({ item }) => {
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

const AboutMeSidebar: FC<IAboutMeSidebarProps> = ({ type }) => {
  const items = SIDEBAR_ITEMS[type];

  return (
    <div className="flex h-full">
      <div className="flex h-full w-auto flex-col gap-8.5 border-r border-r-line px-5.5 pt-4">
        {ABOUT_ME_NAVIGATION.map(item => (
          <NavLink
            href={item.href}
            title={item.title}
            key={item.title}
            isSidebar
            exact={false}
            activeClass={item.activeClass}
          >
            <Icon name={item.icon} className="h-6 w-6" />
          </NavLink>
        ))}
      </div>
      <div className="w-full">
        {items.map(item => (
          <SidebarContentItem
            title={item.title}
            key={item.title}
            blockClass="first:border-b-line first:border-b"
          >
            {item.content.map(contentItem => (
              <ContentLink key={contentItem.title} item={contentItem} />
            ))}
          </SidebarContentItem>
        ))}
      </div>
    </div>
  );
};

export default AboutMeSidebar;
