import type { FC } from "react";

import { techIconId } from "./tech-icon";
import type { TechIconName } from "./tech-icon.types";
import { TECH_ICONS } from "./tech-icons";

const NAMES = Object.keys(TECH_ICONS) as TechIconName[];

// Every logo once, out of sight; render it once on a page that uses `TechIcon`.
const TechIconSprite: FC = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="0"
    height="0"
    className="pointer-events-none absolute"
  >
    {NAMES.map(name => {
      const Logo = TECH_ICONS[name];
      return <Logo key={name} id={techIconId(name)} />;
    })}
  </svg>
);

export default TechIconSprite;
