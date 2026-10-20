"use client";

import { useId, useRef, useState } from "react";
import type { FC } from "react";

import { cn } from "@/shared/lib";
import {
  FOLD_ARROW,
  FOLD_PANEL,
  SHIFT,
  registerMotion,
  useFold
} from "@/shared/lib/motion";
import { Icon } from "@/shared/ui";

import type { ISidebarContentItemProps } from "./sidebar-content-item.types";

registerMotion();

// A section of the explorer: its header folds the rows below it away.
const SidebarContentItem: FC<ISidebarContentItemProps> = ({
  title,
  children,
  className,
  blockClass
}) => {
  const [open, setOpen] = useState(true);
  const listId = useId();
  const ref = useRef<HTMLDivElement>(null);

  useFold(ref, open, { children: true, x: -SHIFT.row });

  return (
    <div ref={ref} className={cn("flex w-full flex-col", blockClass)}>
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
        <Icon name="arrow-down" {...{ [FOLD_ARROW]: "" }} />
        {title}
      </button>
      <div
        id={listId}
        {...{ [FOLD_PANEL]: "" }}
        className="flex flex-col gap-2 pt-4.5 pb-7.5 pl-3.5"
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarContentItem;
