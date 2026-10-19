import { E_ROUTES } from "@/shared/config";
import type { IconName } from "@/shared/ui";

interface IAboutMeSidebarItem {
  icon: IconName;
  title: string;
  href: E_ROUTES;
  activeClass: string;
}

export const ABOUT_ME_NAVIGATION: IAboutMeSidebarItem[] = [
  {
    icon: "sidebar/personal-info",
    title: "Personal Info",
    href: E_ROUTES.ABOUT_PERSONAL,
    activeClass: "desktop:aria-[current=page]:text-accent-2"
  },
  {
    icon: "sidebar/professional-info",
    title: "Professional Info",
    href: E_ROUTES.ABOUT_PROFESSIONAL,
    activeClass: "desktop:aria-[current=page]:text-accent-3"
  },
  {
    icon: "sidebar/hobbies",
    title: "Hobbies",
    href: E_ROUTES.ABOUT_HOBBIES,
    activeClass: "desktop:aria-[current=page]:text-accent-4"
  }
];

interface IContentItemBase {
  title: string;
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
  title: string;
  content: IContentItem[];
}

export const ABOUT_ME_PERSONAL_ITEMS: IAboutItem[] = [
  {
    title: "personal-info",
    content: [
      {
        title: "bio",
        href: E_ROUTES.ABOUT_PERSONAL_BIO,
        activeClass: "desktop:aria-[current=page]:text-accent-2"
      },
      {
        title: "interests",
        href: E_ROUTES.ABOUT_PERSONAL_INTERESTS,
        activeClass: "desktop:aria-[current=page]:text-accent-1"
      }
    ]
  },
  {
    title: "contacts",
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
    title: "professional-info",
    content: [
      {
        title: "skills",
        href: E_ROUTES.ABOUT_PROFESSIONAL_SKILLS,
        activeClass: "desktop:aria-[current=page]:text-accent-2"
      },
      {
        title: "experience",
        href: E_ROUTES.ABOUT_PROFESSIONAL_EXPERIENCE,
        activeClass: "desktop:aria-[current=page]:text-accent-1"
      }
    ]
  },
  {
    title: "contacts",
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
