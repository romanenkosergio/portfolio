import { HTMLAttributes } from "react";
import { Direction } from "../../model";

export interface IKeyboardArrowProps extends HTMLAttributes<HTMLDivElement> {
  direction: Direction;
}
