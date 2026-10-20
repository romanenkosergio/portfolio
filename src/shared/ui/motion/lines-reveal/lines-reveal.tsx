"use client";

import { useRef } from "react";
import type { FC } from "react";

import {
  PENDING_ATTR,
  registerMotion,
  useLinesReveal
} from "@/shared/lib/motion";

import type { ILinesRevealProps } from "./lines-reveal.types";

registerMotion();

/** Host of a code grid: cells marked `data-line-number` / `data-line-text` reveal row by row. */
const LinesReveal: FC<ILinesRevealProps> = ({ className, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useLinesReveal(ref);

  return (
    <div ref={ref} className={className} {...{ [PENDING_ATTR]: "" }}>
      {children}
    </div>
  );
};

export default LinesReveal;
