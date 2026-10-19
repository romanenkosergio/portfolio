import type { AnchorHTMLAttributes } from "react";

import type { LinkProps } from "next/link";

export interface INavLinkProps
  extends
    Omit<LinkProps<string>, "href">,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  exact?: boolean;
  isSidebar?: boolean;
  isExternal?: boolean;
  activeClass?: string;
}
