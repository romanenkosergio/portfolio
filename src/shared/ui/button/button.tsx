import { Link } from "@/shared/i18n";
import { cn } from "@/shared/lib";

import { buttonTextVariants, buttonVariants } from "./button-variants";
import type { IButtonProps } from "./button.types";

const Button = ({
  text,
  className,
  textClassName,
  variant,
  ...rest
}: IButtonProps) => {
  const buttonClassName = cn(buttonVariants({ variant }), className);
  const label = (
    <span className={cn(buttonTextVariants({ variant }), textClassName)}>
      {text}
    </span>
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
