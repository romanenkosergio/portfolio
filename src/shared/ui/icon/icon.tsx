import type { FC } from "react";

import { cn } from "@/shared/lib";

import type { IIconProps } from "./icon.types";
import { ICONS } from "./icons";

const Icon: FC<IIconProps> = ({
  name,
  Tag = "div",
  className,
  svgClass,
  onClick,
  ...props
}) => {
  const Svg = ICONS[name];

  return (
    <Tag
      onClick={onClick}
      className={cn("inline-block select-none", className)}
    >
      <Svg {...props} className={cn("max-h-full max-w-full", svgClass)} />
    </Tag>
  );
};

export default Icon;
