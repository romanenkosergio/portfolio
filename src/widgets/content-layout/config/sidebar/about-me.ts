import { E_ROUTES } from "@/shared/config";
import type { IconName, IconTone } from "@/shared/ui";

export type SectionKey = "personalInfo" | "professionalInfo" | "hobbies";
export type GroupKey = "personalInfo" | "professionalInfo" | "contacts";
export type ItemKey = "bio" | "interests" | "skills" | "experience";

// Titles are the `sidebar.sections|groups|items.<key>` messages.
interface IAboutMeSidebarItem {
  icon: IconName;
  titleKey: SectionKey;
  href: E_ROUTES;
}

export const ABOUT_ME_NAVIGATION: IAboutMeSidebarItem[] = [
  {
    icon: "sidebar/professional-info",
    titleKey: "professionalInfo",
    href: E_ROUTES.ABOUT_PROFESSIONAL
  },
  {
    icon: "sidebar/personal-info",
    titleKey: "personalInfo",
    href: E_ROUTES.ABOUT_PERSONAL
  },
  {
    icon: "sidebar/hobbies",
    titleKey: "hobbies",
    href: E_ROUTES.ABOUT_HOBBIES
  }
];

interface IContentItemBase {
  titleKey?: ItemKey;
  /** Shown as is (an e-mail address) when there is no `titleKey`. */
  title?: string;
  icon?: IconName;
  /** Colour of the folder icon; a file without one is a plain markdown file. */
  tone?: IconTone;
}

interface IInternalContentItem extends IContentItemBase {
  href: E_ROUTES;
  external?: false;
}

// mailto: and other links that leave the site.
interface IExternalContentItem extends IContentItemBase {
  href: string;
  external: true;
}

export type IContentItem = IInternalContentItem | IExternalContentItem;

interface IAboutItem {
  groupKey: GroupKey;
  content: IContentItem[];
}

// The owner's phone number is not published here (it lives in the private CV only).
const CONTACTS: IAboutItem = {
  groupKey: "contacts",
  content: [
    {
      title: "sergromanenko97@gmail.com",
      href: "mailto:sergromanenko97@gmail.com",
      icon: "mail",
      external: true
    }
  ]
};

export const ABOUT_ME_PERSONAL_ITEMS: IAboutItem[] = [
  {
    groupKey: "personalInfo",
    content: [
      {
        titleKey: "bio",
        href: E_ROUTES.ABOUT_PERSONAL_BIO,
        icon: "folder",
        tone: "rose"
      },
      {
        titleKey: "interests",
        href: E_ROUTES.ABOUT_PERSONAL_INTERESTS,
        icon: "folder",
        tone: "mint"
      }
    ]
  },
  CONTACTS
];

export const ABOUT_ME_PROFESSIONAL_ITEMS: IAboutItem[] = [
  {
    groupKey: "professionalInfo",
    content: [
      {
        titleKey: "skills",
        href: E_ROUTES.ABOUT_PROFESSIONAL_SKILLS,
        icon: "folder",
        tone: "indigo"
      },
      {
        titleKey: "experience",
        href: E_ROUTES.ABOUT_PROFESSIONAL_EXPERIENCE,
        icon: "folder",
        tone: "rose"
      }
    ]
  },
  CONTACTS
];
