import type { AnchorHTMLAttributes } from "react";

import type { E_ROUTES } from "@/shared/config";

interface INavLinkBaseProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> {
  exact?: boolean;
  variant?: "header" | "sidebar";
  activeClass?: string;
}

// An internal href is a known route without its locale prefix; the i18n Link adds it.
interface INavLinkInternalProps extends INavLinkBaseProps {
  href: E_ROUTES;
  isExternal?: false;
}

interface INavLinkExternalProps extends INavLinkBaseProps {
  href: string;
  isExternal: true;
}

export type INavLinkProps = INavLinkInternalProps | INavLinkExternalProps;
