import type { ComponentProps, FC, SVGProps } from "react";

import type { VariantProps } from "class-variance-authority";

import type { iconVariants } from "./icon-variants";
import type { ICONS } from "./icons";

// "<file>" or "<folder>/<file>" under public/assets/icons, without ".svg".
export type IconName = keyof typeof ICONS;

export type IconTone = NonNullable<VariantProps<typeof iconVariants>["tone"]>;

export type SVGIcon = SVGProps<SVGSVGElement>;

export type SVGComponent = FC<SVGIcon>;

interface IIconBaseProps
  extends
    Omit<ComponentProps<"svg">, "onClick">,
    VariantProps<typeof iconVariants> {
  name: IconName;
  svgClass?: string;
  Tag?: "div" | "span";
}

// With onClick the icon renders a <button>, which needs an accessible name.
interface IIconClickableProps extends Omit<IIconBaseProps, "Tag"> {
  Tag?: undefined;
  onClick: () => void;
  label: string;
}

interface IIconDecorativeProps extends IIconBaseProps {
  onClick?: undefined;
  label?: undefined;
}

export type IIconProps = IIconClickableProps | IIconDecorativeProps;
