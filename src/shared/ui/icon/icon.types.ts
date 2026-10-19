import type { ComponentProps, FC, SVGProps } from "react";

// A file name under public/assets/icons/<folder>, without ".svg".
export type IconName = string;

export type SVGIcon = SVGProps<SVGSVGElement>;

export type SVGComponent = FC<SVGIcon>;

export interface IIconProps extends ComponentProps<"svg"> {
  name: IconName;
  folder?: string;
  onClick?: () => void;
  svgClass?: string;
  Tag?: "div" | "span" | "button";
}
