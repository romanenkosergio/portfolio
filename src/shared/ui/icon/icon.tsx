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
  interactive,
  faded,
  onClick,
  label,
  ...props
}) => {
  const Svg = ICONS[name];
  const svg = (
    <Svg {...props} className={cn("max-h-full max-w-full", svgClass)} />
  );
  const classes = cn(iconVariants({ tone, interactive, faded }), className);

  // A clickable icon is a real button with a name; a plain one is decoration.
  if (onClick) {
    return (
      <button
        type="button"
        aria-label={label}
        title={label}
        onClick={onClick}
        className={cn(classes, "cursor-pointer")}
      >
        {svg}
      </button>
    );
  }

  return (
    <Tag aria-hidden="true" className={classes}>
      {svg}
    </Tag>
  );
};

export default Icon;
