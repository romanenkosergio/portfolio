import { E_ROUTES } from "@/shared/config";

export interface INavItem {
  label: string;
  href: E_ROUTES;
  linkTitle: string;
  exact: boolean;
}

export const NAV_ITEMS: INavItem[] = [
  {
    label: "_hello",
    href: E_ROUTES.HOME,
    linkTitle: "Go to Home",
    exact: true
  },
  {
    label: "_about-me",
    href: E_ROUTES.ABOUT_ME,
    linkTitle: "Learn more About Me",
    exact: false
  },
  {
    label: "_projects",
    href: E_ROUTES.PROJECTS,
    linkTitle: "Check out my Projects",
    exact: true
  },
  {
    label: "_contact-me",
    href: E_ROUTES.CONTACT,
    linkTitle: "Contact Me",
    exact: true
  }
];
