export interface IFormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  /** Translated error text; its presence marks the field invalid. */
  error?: string;
  multiline?: boolean;
  type?: "text" | "email";
  autoComplete?: string;
  maxLength?: number;
  inputRef: (element: HTMLInputElement | HTMLTextAreaElement | null) => void;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}
