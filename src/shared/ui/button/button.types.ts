import type { ButtonHTMLAttributes, HTMLAttributeAnchorTarget } from "react";

import type { VariantProps } from "class-variance-authority";

import type { E_ROUTES } from "@/shared/config";

import type { IconName } from "../icon";

import type { buttonVariants } from "./button-variants";

interface IBaseButtonProps extends VariantProps<typeof buttonVariants> {
  textClassName?: string;
  text: string;
  /** Decorative icon before the label. */
  icon?: IconName;
  className?: string;
  disabled?: boolean;
}

interface IButtonAsButton
  extends ButtonHTMLAttributes<HTMLButtonElement>, IBaseButtonProps {
  href?: never;
  target?: never;
  isExternalLink?: never;
}

interface IButtonAsInternalLink extends IBaseButtonProps {
  href: E_ROUTES;
  title: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: never;
  isExternalLink?: false;
}

interface IButtonAsExternalLink extends IBaseButtonProps {
  href: string;
  title: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: never;
  isExternalLink: true;
  /** Saves the file instead of opening it. */
  download?: boolean;
}

export type IButtonProps =
  IButtonAsButton | IButtonAsInternalLink | IButtonAsExternalLink;
