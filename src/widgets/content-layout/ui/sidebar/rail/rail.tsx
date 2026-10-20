"use client";

import { useRef } from "react";
import type { FC } from "react";

import { usePathname } from "@/shared/i18n";
import { registerMotion, useSlideIndicator } from "@/shared/lib/motion";

import { aboutSectionOf } from "@/widgets/content-layout/lib";

import type { IRailProps } from "./rail.types";

registerMotion();

// The icon rail of the explorer; one bar marks the current section and slides between icons.
const Rail: FC<IRailProps> = ({ children }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const section = aboutSectionOf(usePathname());

  useSlideIndicator(hostRef, barRef, {
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
