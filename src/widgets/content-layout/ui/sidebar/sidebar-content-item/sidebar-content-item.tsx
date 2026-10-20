"use client";

import { useId, useState } from "react";
import type { FC } from "react";

import { cn } from "@/shared/lib";
import { Icon } from "@/shared/ui";

import type { ISidebarContentItemProps } from "./sidebar-content-item.types";

// A section of the explorer: its header folds the rows below it away.
const SidebarContentItem: FC<ISidebarContentItemProps> = ({
  title,
  children,
  className,
  blockClass
}) => {
  const [open, setOpen] = useState(true);
  const listId = useId();

  return (
    <div className={cn("flex w-full flex-col", blockClass)}>
      <button
        type="button"
        title={title}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen(value => !value)}
        className={cn(
          "flex w-full items-center gap-3 border-b border-b-line py-2.5 pl-3.5 text-left text-base text-white",
          className
        )}
      >
        <Icon name="arrow-down" className={cn(!open && "-rotate-90")} />
        {title}
      </button>
      <div
        id={listId}
        hidden={!open}
        className="flex flex-col gap-2 pt-4.5 pb-7.5 pl-3.5"
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarContentItem;
