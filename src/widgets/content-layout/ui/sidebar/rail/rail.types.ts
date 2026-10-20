import type { PropsWithChildren } from "react";

export type IRailProps = PropsWithChildren<{
  /** The section on screen; the indicator slides when it changes. */
  section: string;
}>;
