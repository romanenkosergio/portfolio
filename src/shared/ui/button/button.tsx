import { Link } from "@/shared/i18n";
import { cn } from "@/shared/lib";

import { Icon } from "../icon";

import { buttonTextVariants, buttonVariants } from "./button-variants";
import type { IButtonProps } from "./button.types";

const Button = ({
  text,
  icon,
  className,
  textClassName,
  variant,
  concealed,
  ...rest
}: IButtonProps) => {
  const buttonClassName = cn(buttonVariants({ variant, concealed }), className);
  const label = (
    <>
      {icon && (
        <Icon name={icon} Tag="span" className="mr-2 size-4 flex-none" />
      )}
      <span className={cn(buttonTextVariants({ variant }), textClassName)}>
        {text}
      </span>
    </>
  );

  if (rest.href === undefined) {
    return (
      <button type="button" {...rest} className={buttonClassName}>
        {label}
      </button>
    );
  }

  if (rest.isExternalLink) {
    return (
      <a
        href={rest.href}
        title={rest.title}
        className={buttonClassName}
        target={rest.target}
        download={rest.download}
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      href={rest.href}
      title={rest.title}
      className={buttonClassName}
      target={rest.target}
    >
      {label}
    </Link>
  );
};

export default Button;
