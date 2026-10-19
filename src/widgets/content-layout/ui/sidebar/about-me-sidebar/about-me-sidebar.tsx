import type { FC } from "react";

import { Icon, NavLink } from "@/shared/ui";

import {
  ABOUT_ME_NAVIGATION,
  ABOUT_ME_PERSONAL_ITEMS,
  ABOUT_ME_PROFESSIONAL_ITEMS
} from "@/widgets/content-layout/config";

import { ContentLink } from "../content-link";
import { SidebarContentItem } from "../sidebar-content-item";

import type { IAboutMeSidebarProps } from "./about-me-sidebar.types";

const SIDEBAR_ITEMS = {
  "personal-info": ABOUT_ME_PERSONAL_ITEMS,
  "professional-info": ABOUT_ME_PROFESSIONAL_ITEMS,
  "hobbies": []
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
