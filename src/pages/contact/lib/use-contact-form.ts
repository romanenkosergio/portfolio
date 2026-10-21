import { useRef, useState } from "react";
import type { FormEvent } from "react";

import { FIELDS } from "../config";
import type { FieldName, FormStatus, IContactErrors } from "../config";
import {
  selectReset,
  selectSetValue,
  selectValues,
  useContactStore
} from "../model";

import { sendMessage } from "./send-message";
import { validateAll, validateField } from "./validate";

type FieldElement = HTMLInputElement | HTMLTextAreaElement;

// State and handlers of the form. Validation runs on blur and on submit (then it follows typing
// in a field that already shows an error); a failed submit focuses the first invalid field.
export const useContactForm = () => {
  const values = useContactStore(selectValues);
  const setValue = useContactStore(selectSetValue);
  const reset = useContactStore(selectReset);
  const [errors, setErrors] = useState<IContactErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const elements = useRef<Partial<Record<FieldName, FieldElement | null>>>({});

  const check = (field: FieldName, value: string) =>
    setErrors(current => ({
      ...current,
      [field]: validateField(field, value)
    }));

  const register = (field: FieldName) => (element: FieldElement | null) => {
    elements.current[field] = element;
  };

  const change = (field: FieldName, value: string) => {
    setValue(field, value);
    if (errors[field]) check(field, value);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    const found = validateAll(values);
    setErrors(found);
    const invalid = FIELDS.find(field => found[field]);
    if (invalid) {
      elements.current[invalid]?.focus();
      return;
    }
    // The honeypot: a filled hidden checkbox is a bot, which is told the message went through.
    const trap = new FormData(event.currentTarget).get("botcheck");
    setStatus("sending");
    const sent = trap ? true : await sendMessage(values);
    setStatus(sent ? "success" : "error");
  };

  const again = () => {
    reset();
    setErrors({});
    setStatus("idle");
  };

  return { values, errors, status, register, change, check, submit, again };
};
