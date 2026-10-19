import type { FC } from "react";

import { AboutMeSidebar } from "./about-me-sidebar";
import type { ISidebarProps } from "./sidebar.types";

const Sidebar: FC<ISidebarProps> = ({ type, subType }) => {
  return (
    <div className="desktop:block desktop:w-83 desktop:border-r desktop:h-full desktop:border-r-line hidden flex-none">
      {type === "about" && <AboutMeSidebar type={subType} />}
    </div>
  );
};

export default Sidebar;
