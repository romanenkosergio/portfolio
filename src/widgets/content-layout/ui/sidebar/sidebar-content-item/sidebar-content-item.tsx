import type { FC } from "react";

import { cn } from "@/shared/lib";
import { Icon } from "@/shared/ui";

import type { ISidebarContentItemProps } from "./sidebar-content-item.types";

const SidebarContentItem: FC<ISidebarContentItemProps> = ({
  title,
  children,
  className,
  blockClass
}) => {
  return (
    <div className={cn("flex w-full flex-col", blockClass)}>
      <div
        className={cn(
          "flex items-center gap-3 border-b border-b-line py-2.5 pl-3.5",
          className
        )}
      >
        <Icon name="arrow-down" />
        <span className="text-white">{title}</span>
      </div>
      <div className="flex flex-col gap-4 pt-4.5 pb-7.5 pl-3.5">{children}</div>
    </div>
  );
};

export default SidebarContentItem;
