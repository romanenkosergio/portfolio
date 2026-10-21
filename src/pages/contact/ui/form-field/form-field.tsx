import type { FC } from "react";

import { cn } from "@/shared/lib";

import { controlVariants } from "./form-field-variants";
import type { IFormFieldProps } from "./form-field.types";

// A labelled input or textarea; the error sits under it and is tied to it with aria-describedby.
const FormField: FC<IFormFieldProps> = ({
  id,
  name,
  label,
  value,
  error,
  multiline,
  type = "text",
  autoComplete,
  maxLength,
  inputRef,
  onChange,
  onFocus,
  onBlur
}) => {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    value,
    autoComplete,
    maxLength,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    "onFocus": onFocus,
    "onBlur": onBlur,
    "className": controlVariants({ invalid: Boolean(error) })
  } as const;

  return (
    <div className="mb-3 flex flex-col gap-2.5">
      <label htmlFor={id} className="text-base text-secondary-1">
        {label}
      </label>
      {multiline ? (
        <textarea
          {...shared}
          ref={inputRef}
          rows={6}
          className={cn(shared.className, "resize-y scrollbar-pane py-2.5")}
          onChange={event => onChange(event.target.value)}
        />
      ) : (
        <input
          {...shared}
          ref={inputRef}
          type={type}
          className={cn(shared.className, "h-9.5")}
          onChange={event => onChange(event.target.value)}
        />
      )}
      <p id={errorId} className="min-h-5 text-sm text-accent-3">
        {error}
      </p>
    </div>
  );
};

export default FormField;
