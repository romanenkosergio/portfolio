import type { FC } from "react";

import Link from "next/link";

import type { Route } from "next";
import { twMerge } from "tailwind-merge";

import type { IButtonProps } from "./button.types";
import { E_BUTTON_VARIANT } from "./button.types";

const buttonVariants = {
  [E_BUTTON_VARIANT.PRIMARY]: "bg-bg-1 desktop:hover:bg-bg-1-hover",
  [E_BUTTON_VARIANT.DEFAULT]: "bg-bg-2 desktop:hover:bg-bg-2-hover",
  [E_BUTTON_VARIANT.GHOST]:
    "bg-transparent border-white desktop:hover:border-white/50"
};

const buttonTextVariants = {
  [E_BUTTON_VARIANT.PRIMARY]: "text-primary-1",
  [E_BUTTON_VARIANT.DEFAULT]: "text-white",
  [E_BUTTON_VARIANT.GHOST]: "text-white"
};

const defaultButtonClass =
  "flex items-center justify-center px-3.5 h-9.5 rounded-lg border border-transparent";

const getLinkProps = (
  isExternalLink: boolean
): Record<string, string | boolean> =>
  isExternalLink ? { rel: "noopener noreferrer" } : {};

const Button: FC<IButtonProps> = ({
  text,
  href,
  title,
  className = "",
  textClassName = "",
  target,
  variant = E_BUTTON_VARIANT.DEFAULT,
  isExternalLink = false,
  ...props
}) => {
  const buttonClassName = twMerge(
    defaultButtonClass,
    buttonVariants[variant],
    className
  );
  const textClassNameMerged = twMerge(
    buttonTextVariants[variant],
    textClassName,
    "text-sm leading-4.5"
  );

  const LinkComponent = isExternalLink ? "a" : Link;

  return href ? (
    <LinkComponent
      href={href as Route}
      title={title || undefined}
      className={buttonClassName}
      target={target}
      {...getLinkProps(isExternalLink)}
    >
      <span className={textClassNameMerged}>{text}</span>
    </LinkComponent>
  ) : (
    <button {...props} className={buttonClassName}>
      <span className={textClassNameMerged}>{text}</span>
    </button>
  );
};

export default Button;
