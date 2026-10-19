"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/shared/lib";

import type { INavLinkProps } from "./nav-link.types";

// `trailingSlash: true` makes usePathname() return "/contact/" while hrefs are "/contact".
const trimSlash = (path: string): string =>
  path.length > 1 ? path.replace(/\/+$/, "") : path;

const isLinkActive = (pathname: string, href: string, exact: boolean) => {
  const current = trimSlash(pathname);
  const target = trimSlash(href);
  return exact
    ? current === target
    : current.startsWith(`${target}/`) || current === target;
};

const NavLink = <T extends string>({
  exact = true,
  children,
  className,
  isSidebar = false,
  activeClass,
  ...props
}: INavLinkProps<T>) => {
  const pathname = usePathname();

  const linkClassName = cn(
    "text-white desktop:border-b-3 desktop:border-b-transparent desktop:text-secondary-1 max-desktop:aria-[current=page]:text-accent-1",
    isSidebar
      ? activeClass || "desktop:aria-[current=page]:text-accent-2"
      : [
          activeClass || "desktop:aria-[current=page]:border-b-accent-1",
          "desktop:aria-[current=page]:text-white"
        ],
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
      aria-current={
        isLinkActive(pathname ?? "", props.href, exact) ? "page" : undefined
      }
    >
      {children}
    </Link>
  );
};

export default NavLink;
