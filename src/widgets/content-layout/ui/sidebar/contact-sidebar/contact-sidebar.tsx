import type { FC } from "react";

import { useTranslations } from "next-intl";

import { CONTACTS, FIND_ME_ALSO_IN } from "@/widgets/content-layout/config";

import { ContentLink } from "../content-link";
import { SidebarContentItem } from "../sidebar-content-item";

const GROUPS = [CONTACTS, FIND_ME_ALSO_IN];

const ContactSidebar: FC = () => {
  const t = useTranslations("sidebar.groups");

  return (
    <div className="h-full overflow-y-auto">
      {GROUPS.map(group => (
        <SidebarContentItem
          key={group.groupKey}
          title={t(group.groupKey)}
          blockClass="first:border-b-line first:border-b"
        >
          {group.content.map(item => (
            <ContentLink key={item.title} item={item} />
          ))}
        </SidebarContentItem>
      ))}
    </div>
  );
};

export default ContactSidebar;
