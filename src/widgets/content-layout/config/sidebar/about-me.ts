import { E_ROUTES } from "@/shared/config";

interface IAboutMeSidebarItem {
  icon: string;
  title: string;
  href: E_ROUTES;
  activeClass: string;
}

export const ABOUT_ME_NAVIGATION: IAboutMeSidebarItem[] = [
  {
    icon: "personal-info",
    title: "Personal Info",
    href: E_ROUTES.ABOUT_PERSONAL,
    activeClass: "desktop:[&.active]:text-accent-2"
  },
  {
    icon: "professional-info",
    title: "Professional Info",
    href: E_ROUTES.ABOUT_PROFESSIONAL,
    activeClass: "desktop:[&.active]:text-accent-3"
  },
  {
    icon: "hobbies",
    title: "Hobbies",
    href: E_ROUTES.ABOUT_HOBBIES,
    activeClass: "desktop:[&.active]:text-accent-4"
  }
];

interface IContentItem {
  title: string;
  href: E_ROUTES | string;
  icon?: string;
  external?: boolean;
  activeClass?: string;
}

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
        activeClass: "desktop:[&.active]:text-accent-2"
      },
      {
        title: "interests",
        href: E_ROUTES.ABOUT_PERSONAL_INTERESTS,
        activeClass: "desktop:[&.active]:text-accent-1"
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
        activeClass: "desktop:[&.active]:text-accent-2"
      },
      {
        title: "experience",
        href: E_ROUTES.ABOUT_PROFESSIONAL_EXPERIENCE,
        activeClass: "desktop:[&.active]:text-accent-1"
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
