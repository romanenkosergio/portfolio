import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface INavigationProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  linkClassName?: string;
  isMobile?: boolean;
}
