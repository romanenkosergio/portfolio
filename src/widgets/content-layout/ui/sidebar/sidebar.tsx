import type { FC } from "react";

import { AboutMeSidebar } from "./about-me-sidebar";
import type { ISidebarProps } from "./sidebar.types";

const Sidebar: FC<ISidebarProps> = ({ type }) => {
  return (
    <div className="hidden flex-none desktop:block desktop:h-full desktop:w-77.75 desktop:border-r desktop:border-r-line">
      {type === "about" && <AboutMeSidebar />}
    </div>
  );
};

export default Sidebar;
