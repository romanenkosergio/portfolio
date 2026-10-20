"use client";

import { useId } from "react";
import type { FC } from "react";

import { cn } from "@/shared/lib";
import { Checkbox, Icon } from "@/shared/ui";

import { TECHS } from "@/entities/project";

import type { ITechFilterProps } from "./tech-filter.types";

// The sidebar: a heading and one real checkbox per technology. Checked rows read white, the rest dim.
const TechFilter: FC<ITechFilterProps> = ({
  title,
  label,
  techs,
  checked,
  onToggle
}) => {
  const prefix = useId();

  return (
    <aside
      aria-label={label}
      className="flex-none border-b border-b-line desktop:w-77.75 desktop:border-r desktop:border-b-0 desktop:border-r-line"
    >
      <h2 className="flex items-center gap-3 border-b border-b-line py-2.5 pl-3.5 text-base font-normal text-white">
        <Icon name="arrow-down" />
        {title}
      </h2>
      <ul className="flex flex-wrap gap-x-6 gap-y-4 px-5.5 py-4.5 desktop:flex-col desktop:gap-y-4.25">
        {techs.map(tech => {
          const { label: name, icon } = TECHS[tech];
          const isChecked = checked.includes(tech);
          return (
            <li key={tech} className="flex items-center gap-6">
              <Checkbox
                id={`${prefix}-${tech}`}
                checked={isChecked}
                onCheckedChange={() => onToggle(tech)}
              />
              <label
                htmlFor={`${prefix}-${tech}`}
                title={name}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 text-base transition-colors duration-300",
                  isChecked ? "text-white" : "text-secondary-1/40"
                )}
              >
                <Icon
                  name={icon}
                  tone="muted"
                  faded={!isChecked}
                  className="size-6"
                />
                {name}
              </label>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default TechFilter;
