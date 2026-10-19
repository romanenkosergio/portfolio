import type { HTMLAttributes } from "react";

import type { Direction } from "../../model";

export interface IKeyboardArrowProps extends HTMLAttributes<HTMLDivElement> {
  direction: Direction;
}
