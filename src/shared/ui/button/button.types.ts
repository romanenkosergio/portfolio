import type { ButtonHTMLAttributes, HTMLAttributeAnchorTarget } from "react";

import type { VariantProps } from "class-variance-authority";
import type { Route } from "next";

import type { buttonVariants } from "./button-variants";

interface IBaseButtonProps extends VariantProps<typeof buttonVariants> {
  textClassName?: string;
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

interface IButtonAsInternalLink<T extends string> extends IBaseButtonProps {
  href: Route<T>;
  title: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: () => void;
  isExternalLink?: false;
}

interface IButtonAsExternalLink extends IBaseButtonProps {
  href: string;
  title: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: () => void;
  isExternalLink: true;
}

export type IButtonProps<T extends string = string> =
  IButtonAsButton | IButtonAsInternalLink<T> | IButtonAsExternalLink;
