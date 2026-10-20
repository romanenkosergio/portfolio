import type { SVGProps } from "react";

import type { TECH_ICONS } from "./tech-icons";

export type TechIconName = keyof typeof TECH_ICONS;

export interface ITechIconProps extends SVGProps<SVGSVGElement> {
  name: TechIconName;
}
