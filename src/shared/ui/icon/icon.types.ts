import type { ComponentProps, FC, SVGProps } from "react";

import type { VariantProps } from "class-variance-authority";

import type { iconVariants } from "./icon-variants";
import type { ICONS } from "./icons";

// "<file>" or "<folder>/<file>" under public/assets/icons, without ".svg".
export type IconName = keyof typeof ICONS;

export type SVGIcon = SVGProps<SVGSVGElement>;

export type SVGComponent = FC<SVGIcon>;

export interface IIconProps
  extends ComponentProps<"svg">, VariantProps<typeof iconVariants> {
  name: IconName;
  onClick?: () => void;
  svgClass?: string;
  Tag?: "div" | "span" | "button";
}
