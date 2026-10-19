"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnchorHTMLAttributes, FC } from "react";
import { twMerge } from "tailwind-merge";
import { INavLinkProps } from "./nav-link.types";

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
  const isActive = exact
    ? pathname === href
    : pathname?.startsWith(href as string);

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

  const Tag = isExternal ? "a" : Link;

  const externalProps: AnchorHTMLAttributes<HTMLAnchorElement> = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Tag
      href={href as string}
      {...(isExternal ? externalProps : {})}
      className={twMerge(currentClassName, className)}
      {...props}
      title={title}
    >
      {children}
    </Tag>
  );
};

export default NavLink;
