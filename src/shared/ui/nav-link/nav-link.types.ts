import { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";

export interface INavLinkProps
  extends LinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  exact?: boolean;
  isSidebar?: boolean;
  isExternal?: boolean;
  activeClass?: string;
}
