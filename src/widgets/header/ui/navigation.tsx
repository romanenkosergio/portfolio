import { FC } from "react";
import { NavLink } from "@/shared/ui";
import { NAV_ITEMS } from "../config";
import { INavigationProps } from "./navigation.types";

const Navigation: FC<INavigationProps> = ({
  className,
  linkClassName,
  isMobile,
  onClick
}) => {
  return (
    <nav className={className}>
      {NAV_ITEMS.map(item => (
        <NavLink
          onClick={onClick}
          href={item.href}
          title={item.linkTitle}
          className={linkClassName}
          exact={item.exact}
          key={`${item.label}-${isMobile ? "mobile" : "desktop"}`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
