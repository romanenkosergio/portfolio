"use client";

import { Link, usePathname } from "@/shared/i18n";
import { cn } from "@/shared/lib";

import { navLinkActiveClass, navLinkVariants } from "./nav-link-variants";
import type { INavLinkProps } from "./nav-link.types";

// `trailingSlash: true` makes usePathname() return "/contact/" while hrefs are "/contact"; the
// i18n usePathname already drops the locale prefix, so both sides compare as "/contact".
const trimSlash = (path: string): string =>
  path.length > 1 ? path.replace(/\/+$/, "") : path;

// "page" only for the link to the current page, "true" for an ancestor of it (non-exact links).
const getAriaCurrent = (
  pathname: string,
  href: string,
  exact: boolean
): "page" | "true" | undefined => {
  const current = trimSlash(pathname);
  const target = trimSlash(href);
  if (current === target) {
    return "page";
  }
  return !exact && current.startsWith(`${target}/`) ? "true" : undefined;
};

const NavLink = ({
  exact = true,
  children,
  className,
  variant = "header",
  activeClass,
  ...props
}: INavLinkProps) => {
  const pathname = usePathname();

  const linkClassName = cn(
    navLinkVariants({ variant }),
    activeClass || navLinkActiveClass[variant],
    className
  );

  if (props.isExternal) {
    const { isExternal: _isExternal, ...anchorProps } = props;
    // Only a web page opens in a new tab; mailto:/tel: hand off to an app.
    const newTab = /^https?:/.test(anchorProps.href)
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <a {...newTab} {...anchorProps} className={linkClassName}>
        {children}
      </a>
    );
  }

  const { isExternal: _isExternal, ...linkProps } = props;
  return (
    <Link
      {...linkProps}
      className={linkClassName}
      aria-current={getAriaCurrent(pathname ?? "", props.href, exact)}
    >
      {children}
    </Link>
  );
};

export default NavLink;
