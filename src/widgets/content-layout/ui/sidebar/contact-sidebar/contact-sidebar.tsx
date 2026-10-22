import type { FC } from "react";

import { useTranslations } from "next-intl";

import { cn } from "@/shared/lib";

import { CONTACTS, FIND_ME_ALSO_IN } from "@/widgets/content-layout/config";

import { ContentLink } from "../content-link";
import { SidebarContentItem } from "../sidebar-content-item";

import type { IContactSidebarProps } from "./contact-sidebar.types";

const GROUPS = [CONTACTS, FIND_ME_ALSO_IN];

const ContactSidebar: FC<IContactSidebarProps> = ({ className }) => {
  const t = useTranslations("sidebar.groups");

  return (
    <div className={cn("h-full overflow-y-auto", className)}>
      {GROUPS.map(group => (
        <SidebarContentItem
          key={group.groupKey}
          title={t(group.groupKey)}
          blockClass="first:border-b-line first:border-b"
        >
          {group.content.map(item => (
            <ContentLink key={item.titleKey ?? item.title} item={item} />
          ))}
        </SidebarContentItem>
      ))}
    </div>
  );
};

export default ContactSidebar;
