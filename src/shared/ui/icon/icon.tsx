import type { FC } from "react";

import { cn } from "@/shared/lib";

import { iconVariants } from "./icon-variants";
import type { IIconProps } from "./icon.types";
import { ICONS } from "./icons";

const Icon: FC<IIconProps> = ({
  name,
  Tag = "div",
  className,
  svgClass,
  tone,
  hover,
  motion,
  faded,
  onClick,
  ...props
}) => {
  const Svg = ICONS[name];

  return (
    <Tag
      onClick={onClick}
      className={cn(iconVariants({ tone, hover, motion, faded }), className)}
    >
      <Svg {...props} className={cn("max-h-full max-w-full", svgClass)} />
    </Tag>
  );
};

export default Icon;
