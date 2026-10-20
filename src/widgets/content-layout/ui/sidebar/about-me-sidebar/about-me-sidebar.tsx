import type { FC } from "react";

import { useTranslations } from "next-intl";

import { Icon, NavLink } from "@/shared/ui";

import {
  ABOUT_ME_HOBBIES_ITEMS,
  ABOUT_ME_NAVIGATION,
  ABOUT_ME_PERSONAL_ITEMS,
  ABOUT_ME_PROFESSIONAL_ITEMS
} from "@/widgets/content-layout/config";
import type { AboutSection } from "@/widgets/content-layout/lib";

import { ContentLink } from "../content-link";
import { Rail } from "../rail";
import { SectionPanels } from "../section-panels";
import { SidebarContentItem } from "../sidebar-content-item";

const SIDEBAR_ITEMS = {
  "personal-info": ABOUT_ME_PERSONAL_ITEMS,
  "professional-info": ABOUT_ME_PROFESSIONAL_ITEMS,
  "hobbies": ABOUT_ME_HOBBIES_ITEMS
};

const AboutMeSidebar: FC = () => {
  const t = useTranslations("sidebar");
  const renderItems = (items: (typeof SIDEBAR_ITEMS)[AboutSection]) =>
    items.map(item => (
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
    ));

  return (
    <div className="flex h-full">
      <Rail>
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
      </Rail>
      <SectionPanels
        panels={{
          "personal-info": renderItems(SIDEBAR_ITEMS["personal-info"]),
          "professional-info": renderItems(SIDEBAR_ITEMS["professional-info"]),
          "hobbies": renderItems(SIDEBAR_ITEMS.hobbies)
        }}
      />
    </div>
  );
};

export default AboutMeSidebar;
