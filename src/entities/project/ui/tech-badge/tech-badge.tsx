import type { FC } from "react";

import { cn } from "@/shared/lib";
import { Icon } from "@/shared/ui";

import { TECHS } from "@/entities/project/config";

import type { ITechBadgeProps } from "./tech-badge.types";

// A square chip with the tech's glyph; the name is read by screen readers and shown on hover.
const TechBadge: FC<ITechBadgeProps> = ({ tech }) => {
  const { label, icon, badge } = TECHS[tech];

  return (
    <li
      title={label}
      className={cn(
        "grid size-7 place-items-center rounded-sm text-primary-3",
        badge
      )}
    >
      <Icon name={icon} className="size-4" />
      <span className="sr-only">{label}</span>
    </li>
  );
};

export default TechBadge;
