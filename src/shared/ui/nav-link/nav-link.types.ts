import { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";

export interface INavLinkProps
  extends Omit<LinkProps<string>, "href">,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  exact?: boolean;
  isSidebar?: boolean;
  isExternal?: boolean;
  activeClass?: string;
}
