"use client";

import { useRef } from "react";
import type { FC } from "react";

import { registerMotion, useSlideIndicator } from "@/shared/lib/motion";

import type { IRailProps } from "./rail.types";

registerMotion();

// The icon rail of the explorer; one bar marks the current section and slides between icons.
const Rail: FC<IRailProps> = ({ section, children }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useSlideIndicator(hostRef, barRef, {
    id: "rail",
    axis: "y",
    active: "[aria-current]",
    value: section
  });

  return (
    <div
      ref={hostRef}
      className="relative flex h-full w-auto flex-col gap-10 border-r border-r-line px-5.5 pt-5"
    >
      {children}
      <span
        ref={barRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-px w-0.5 bg-accent-1 opacity-0"
      />
    </div>
  );
};

export default Rail;
