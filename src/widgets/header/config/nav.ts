import { E_ROUTES } from "@/shared/config";

export type NavKey = "hello" | "aboutMe" | "projects" | "contactMe";

export interface INavItem {
  key: NavKey;
  href: E_ROUTES;
  exact: boolean;
}

// Labels and link titles are the `header.nav.<key>` messages.
export const NAV_ITEMS: INavItem[] = [
  { key: "hello", href: E_ROUTES.HOME, exact: true },
  { key: "aboutMe", href: E_ROUTES.ABOUT_ME, exact: false },
  { key: "projects", href: E_ROUTES.PROJECTS, exact: true },
  { key: "contactMe", href: E_ROUTES.CONTACT, exact: true }
];
