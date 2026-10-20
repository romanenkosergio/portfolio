import type { FC } from "react";

import type { ITechCheckboxProps } from "./tech-checkbox.types";

// A native checkbox drawn as a square; the tick is an inline SVG shown by `peer-checked`.
const TechCheckbox: FC<ITechCheckboxProps> = ({
  id,
  checked,
  onChange,
  ref
}) => (
  <span className="relative flex flex-none">
    <input
      type="checkbox"
      ref={ref}
      id={id}
      checked={checked}
      onChange={onChange}
      className="peer size-4.75 cursor-pointer appearance-none rounded-xs border border-secondary-1/40 transition-colors duration-300 outline-none checked:border-secondary-1 checked:bg-secondary-1 focus-visible:ring-[3px] focus-visible:ring-ring/50"
    />
    <svg
      aria-hidden="true"
      viewBox="0 0 12 9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="pointer-events-none absolute inset-0 m-auto h-2.25 w-3 text-white opacity-0 peer-checked:opacity-100"
    >
      <path d="M1 4.5 4.2 7.5 11 1" />
    </svg>
  </span>
);

export default TechCheckbox;
