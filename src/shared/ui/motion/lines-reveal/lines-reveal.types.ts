import type { PropsWithChildren } from "react";

export type ILinesRevealProps = PropsWithChildren<{
  /** Layout classes only. */
  className?: string;
  /** Above the fold: painted visible in the server HTML, rows only slide (LCP does not wait for GSAP). */
  eager?: boolean;
}>;
