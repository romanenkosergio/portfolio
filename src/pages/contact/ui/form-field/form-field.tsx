import type { FC } from "react";

import { cn } from "@/shared/lib";

import type { IFormFieldProps } from "./form-field.types";

const CONTROL =
  "w-full rounded-lg border bg-primary-3 px-3.5 text-base text-white transition-colors duration-300 outline-none placeholder:text-secondary-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1";

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
    "onBlur": onBlur,
    "className": cn(
      CONTROL,
      error ? "border-accent-3" : "border-line hover:border-secondary-1/60"
    )
  } as const;

  return (
    <div className="flex flex-col gap-2.5">
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
