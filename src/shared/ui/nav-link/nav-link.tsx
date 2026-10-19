"use client";

import type { FC } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Route } from "next";
import { twMerge } from "tailwind-merge";

import type { INavLinkProps } from "./nav-link.types";

const NavLink: FC<INavLinkProps> = ({
  href,
  exact = true,
  children,
  className,
  title,
  isSidebar = false,
  isExternal = false,
  activeClass = undefined,
  ...props
}) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname?.startsWith(href);

  const currentClassName = `desktop:text-secondary-1 
  max-desktop:[&.active]:text-accent-1 
  desktop:border-b-3 
  desktop:border-b-transparent 
${
  isSidebar
    ? activeClass || "desktop:[&.active]:text-accent-2"
    : twMerge(
        activeClass || "desktop:[&.active]:border-b-accent-1",
        "desktop:[&.active]:text-white"
      )
}  text-white 
  ${isActive ? "active" : ""} 
  ${isSidebar ? "sidebar" : ""}
`;

  const linkClassName = twMerge(currentClassName, className);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
        {...props}
        title={title}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href as Route}
      className={linkClassName}
      {...props}
      title={title}
    >
      {children}
    </Link>
  );
};

export default NavLink;
