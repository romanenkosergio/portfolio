import type { FC } from "react";

import type { ITechIconProps } from "./tech-icon.types";
import { TECH_ICONS } from "./tech-icons";

// A decorative logo in `currentColor`; the caller names the technology in text.
const TechIcon: FC<ITechIconProps> = ({ name, ...props }) => {
  const Svg = TECH_ICONS[name];
  return <Svg aria-hidden="true" {...props} />;
};

export default TechIcon;
