import type { FC } from "react";

import type { ITechIconProps } from "./tech-icon.types";

/** Id of a logo inside the sprite (`TechIconSprite`). */
export const techIconId = (name: ITechIconProps["name"]): string =>
  `tech-icon-${name}`;

// A decorative logo in `currentColor`; the caller names the technology in text. It points at the
// page's single `TechIconSprite`, so a logo used by many cards is in the HTML once, not per use.
const TechIcon: FC<ITechIconProps> = ({ name, ...props }) => (
  <svg aria-hidden="true" {...props}>
    <use href={`#${techIconId(name)}`} />
  </svg>
);

export default TechIcon;
