import type { FC } from "react";

import { useTranslations } from "next-intl";

import {
  ABOUT_ME_HOBBIES_ITEMS,
  ABOUT_ME_PERSONAL_ITEMS,
  ABOUT_ME_PROFESSIONAL_ITEMS,
  CONTACTS
} from "@/widgets/content-layout/config";
import type { AboutSection } from "@/widgets/content-layout/lib";

import { ContentLink } from "../content-link";
import { SidebarContentItem } from "../sidebar-content-item";

// The first group of each section is its own; the contacts group repeats in all of them.
const GROUPS = [
  { section: "personal-info", group: ABOUT_ME_PERSONAL_ITEMS[0] },
  { section: "professional-info", group: ABOUT_ME_PROFESSIONAL_ITEMS[0] },
  { section: "hobbies", group: ABOUT_ME_HOBBIES_ITEMS[0] },
  { section: null, group: CONTACTS }
] satisfies { section: AboutSection | null; group: typeof CONTACTS }[];

// Below `desktop` the explorer is a stack of folding sections above the file; the one of the
// current section starts open.
const AboutMobileExplorer: FC = () => {
  const t = useTranslations("sidebar.groups");

  return (
    <div className="flex-none border-b border-b-line desktop:hidden">
      {GROUPS.map(({ section, group }) => (
        <SidebarContentItem
          key={group.groupKey}
          title={t(group.groupKey)}
          blockClass="not-last:border-b not-last:border-b-line"
          openOn={section}
        >
          {group.content.map(item => (
            <ContentLink key={item.titleKey ?? item.title} item={item} />
          ))}
        </SidebarContentItem>
      ))}
    </div>
  );
};

export default AboutMobileExplorer;
