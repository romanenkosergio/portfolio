import { FC, memo } from "react";
import { twMerge } from "tailwind-merge";

import { IIconProps, SVGComponent } from "./icon.types";

const Icon: FC<IIconProps> = ({
  name,
  Tag = "div",
  folder = "",
  className,
  svgClass,
  onClick,
  ...props
}) => {
  let Svg: SVGComponent | null = null;
  try {
    Svg = require(
      `@/public/assets/icons/${folder ? `${folder}/` : ""}${name}.svg`
    ).default;
  } catch (error) {
    console.warn(`Icon ${name} not found`);
  }

  const svgClasses = twMerge("max-h-full max-w-full", svgClass);

  return (
    <Tag
      onClick={onClick}
      className={twMerge("inline-block select-none", className)}
    >
      {Svg ? (
        <Svg {...props} className={svgClasses} />
      ) : (
        <div className="size-6 animate-pulse bg-gray-200" />
      )}
    </Tag>
  );
};

export default memo(Icon);
