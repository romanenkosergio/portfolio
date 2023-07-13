import { HTMLInputTypeAttribute } from "react";
import { FieldError } from "react-hook-form/dist/types/errors";

export interface IInputProps {
  register: any;
  type?: HTMLInputTypeAttribute;
  error?: FieldError;
}
