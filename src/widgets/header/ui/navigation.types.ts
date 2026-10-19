import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface INavigationProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> {
  linkClassName?: string;
  isMobile?: boolean;
  /** Rendered before the last link, pushed to the right (the desktop language switcher). */
  beforeLast?: ReactNode;
}
