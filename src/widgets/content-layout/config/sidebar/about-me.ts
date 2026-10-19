import { E_ROUTES } from "@/shared/config";
import type { IconName } from "@/shared/ui";

export type SectionKey = "personalInfo" | "professionalInfo" | "hobbies";
export type GroupKey = "personalInfo" | "professionalInfo" | "contacts";
export type ItemKey = "bio" | "interests" | "skills" | "experience";

// Titles are the `sidebar.sections|groups|items.<key>` messages.
interface IAboutMeSidebarItem {
  icon: IconName;
  titleKey: SectionKey;
  href: E_ROUTES;
  activeClass: string;
}

export const ABOUT_ME_NAVIGATION: IAboutMeSidebarItem[] = [
  {
    icon: "sidebar/personal-info",
    titleKey: "personalInfo",
    href: E_ROUTES.ABOUT_PERSONAL,
    activeClass: "desktop:aria-[current]:text-accent-2"
  },
  {
    icon: "sidebar/professional-info",
    titleKey: "professionalInfo",
    href: E_ROUTES.ABOUT_PROFESSIONAL,
    activeClass: "desktop:aria-[current]:text-accent-3"
  },
  {
    icon: "sidebar/hobbies",
    titleKey: "hobbies",
    href: E_ROUTES.ABOUT_HOBBIES,
    activeClass: "desktop:aria-[current]:text-accent-4"
  }
];

interface IContentItemBase {
  titleKey?: ItemKey;
  /** Shown as is (an e-mail address, a phone number) when there is no `titleKey`. */
  title?: string;
  icon?: IconName;
  activeClass?: string;
}

interface IInternalContentItem extends IContentItemBase {
  href: E_ROUTES;
  external?: false;
}

// mailto: / tel: and other links that leave the site.
interface IExternalContentItem extends IContentItemBase {
  href: string;
  external: true;
}

export type IContentItem = IInternalContentItem | IExternalContentItem;

interface IAboutItem {
  groupKey: GroupKey;
  content: IContentItem[];
}

export const ABOUT_ME_PERSONAL_ITEMS: IAboutItem[] = [
  {
    groupKey: "personalInfo",
    content: [
      {
        titleKey: "bio",
        href: E_ROUTES.ABOUT_PERSONAL_BIO,
        activeClass: "desktop:aria-[current]:text-accent-2"
      },
      {
        titleKey: "interests",
        href: E_ROUTES.ABOUT_PERSONAL_INTERESTS,
        activeClass: "desktop:aria-[current]:text-accent-1"
      }
    ]
  },
  {
    groupKey: "contacts",
    content: [
      {
        title: "sergromanenko97@gmail.com",
        href: "mailto:sergromanenko97@gmail.com",
        icon: "mail",
        external: true
      },
      {
        title: "+380731055010",
        href: "tel:+380731055010",
        external: true,
        icon: "phone"
      }
    ]
  }
];
export const ABOUT_ME_PROFESSIONAL_ITEMS: IAboutItem[] = [
  {
    groupKey: "professionalInfo",
    content: [
      {
        titleKey: "skills",
        href: E_ROUTES.ABOUT_PROFESSIONAL_SKILLS,
        activeClass: "desktop:aria-[current]:text-accent-2"
      },
      {
        titleKey: "experience",
        href: E_ROUTES.ABOUT_PROFESSIONAL_EXPERIENCE,
        activeClass: "desktop:aria-[current]:text-accent-1"
      }
    ]
  },
  {
    groupKey: "contacts",
    content: [
      {
        title: "sergromanenko97@gmail.com",
        href: "mailto:sergromanenko97@gmail.com",
        icon: "mail",
        external: true
      },
      {
        title: "+380731055010",
        href: "tel:+380731055010",
        external: true,
        icon: "phone"
      }
    ]
  }
];
