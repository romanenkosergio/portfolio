import type { RefObject } from "react";

export interface ITechCheckboxProps {
  id: string;
  checked: boolean;
  onChange: () => void;
  ref?: RefObject<HTMLInputElement | null>;
}
