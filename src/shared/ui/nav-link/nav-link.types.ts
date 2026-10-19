import type { AnchorHTMLAttributes } from "react";

import type { LinkProps } from "next/link";

import type { Route } from "next";

interface INavLinkBaseProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> {
  exact?: boolean;
  isSidebar?: boolean;
  activeClass?: string;
}

interface INavLinkInternalProps<T extends string>
  extends INavLinkBaseProps, Omit<LinkProps<string>, "href"> {
  href: Route<T>;
  isExternal?: false;
}

interface INavLinkExternalProps extends INavLinkBaseProps {
  href: string;
  isExternal: true;
}

// `Route<T>` (not bare `Route`) so typed-routes also accepts the dynamic leaves (/about-me/personal-info/bio).
export type INavLinkProps<T extends string = string> =
  INavLinkInternalProps<T> | INavLinkExternalProps;
