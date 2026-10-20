import type { FC } from "react";

import { useTranslations } from "next-intl";

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
  const t = useTranslations("sidebar");
  const items = SIDEBAR_ITEMS[type];

  return (
    <div className="flex h-full">
      <div className="flex h-full w-auto flex-col gap-10 border-r border-r-line px-5.5 pt-5">
        {ABOUT_ME_NAVIGATION.map(item => (
          <NavLink
            href={item.href}
            title={t(`sections.${item.titleKey}`)}
            key={item.titleKey}
            variant="rail"
            exact={false}
          >
            <Icon name={item.icon} className="h-6 w-6" />
          </NavLink>
        ))}
      </div>
      <div className="min-w-0 flex-1 overflow-y-auto">
        {items.map(item => (
          <SidebarContentItem
            title={t(`groups.${item.groupKey}`)}
            key={item.groupKey}
            blockClass="first:border-b-line first:border-b"
          >
            {item.content.map(contentItem => (
              <ContentLink
                key={contentItem.titleKey ?? contentItem.title}
                item={contentItem}
              />
            ))}
          </SidebarContentItem>
        ))}
      </div>
    </div>
  );
};

export default AboutMeSidebar;
