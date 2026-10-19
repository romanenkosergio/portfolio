import type { ButtonHTMLAttributes, HTMLAttributeAnchorTarget } from "react";

export enum E_BUTTON_VARIANT {
  PRIMARY = "primary",
  DEFAULT = "default",
  GHOST = "ghost"
}

interface IBaseButtonProps {
  textClassName?: string;
  variant?: E_BUTTON_VARIANT;
  text: string;
  className?: string;
  disabled?: boolean;
}

interface IButtonAsButton
  extends ButtonHTMLAttributes<HTMLButtonElement>, IBaseButtonProps {
  href?: never;
  target?: never;
  isExternalLink?: never;
}

interface IButtonAsLink extends IBaseButtonProps {
  href: string;
  title: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: () => void;
  isExternalLink?: boolean;
}

export type IButtonProps = IButtonAsButton | IButtonAsLink;
