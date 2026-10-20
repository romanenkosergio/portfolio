"use client";

import { useId } from "react";
import type { FC } from "react";

import { cn } from "@/shared/lib";
import { Icon } from "@/shared/ui";

import type { ITechFilterProps } from "./tech-filter.types";

// The sidebar: a heading and one real checkbox per technology. Checked rows read white, the
// rest light grey (#c4c4c4, over 4.5:1 on the panel) with a dimmed logo.
const TechFilter: FC<ITechFilterProps> = ({
  title,
  label,
  filters,
  checked,
  onToggle,
  firstRef
}) => {
  const prefix = useId();

  return (
    <aside
      aria-label={label}
      className="flex-none border-b border-b-line desktop:w-77.75 desktop:border-r desktop:border-b-0 desktop:border-r-line"
    >
      <h2
        id={`${prefix}-title`}
        className="flex items-center gap-3 border-b border-b-line py-2.5 pl-3.5 text-base font-normal text-white"
      >
        <Icon name="arrow-down" />
        {title}
      </h2>
      <ul
        role="group"
        aria-labelledby={`${prefix}-title`}
        className="flex flex-wrap gap-x-6 gap-y-4 px-5.5 py-4.5 desktop:flex-col desktop:gap-y-4.25"
      >
        {filters.map(({ tech, node }, index) => {
          const isChecked = checked.includes(tech);
          return (
            <li key={tech} className="flex items-center gap-6">
              <input
                type="checkbox"
                ref={index === 0 ? firstRef : undefined}
                id={`${prefix}-${tech}`}
                checked={isChecked}
                onChange={() => onToggle(tech)}
                className="size-4.75 flex-none cursor-pointer appearance-none rounded-xs border border-secondary-1/40 bg-center bg-no-repeat transition-colors duration-300 outline-none checked:border-secondary-1 checked:bg-secondary-1 checked:bg-[url(data:image/svg+xml,%3Csvg%20xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox=%220%200%2012%209%22%20fill=%22none%22%20stroke=%22white%22%20stroke-width=%221.6%22%3E%3Cpath%20d=%22M1%204.5%204.2%207.5%2011%201%22/%3E%3C/svg%3E)] focus-visible:ring-[3px] focus-visible:ring-ring/50"
              />
              <label
                htmlFor={`${prefix}-${tech}`}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 text-base transition-colors duration-300",
                  isChecked
                    ? "text-white"
                    : "text-secondary-4 [&>svg]:opacity-60"
                )}
              >
                {node}
              </label>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default TechFilter;
