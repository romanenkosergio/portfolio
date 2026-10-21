import type { RefObject } from "react";

export interface ITechCheckboxProps {
  id: string;
  checked: boolean;
  onChange: () => void;
  /** Inert until hydration: a click before it would tick the box without filtering. */
  disabled?: boolean;
  ref?: RefObject<HTMLInputElement | null>;
}
