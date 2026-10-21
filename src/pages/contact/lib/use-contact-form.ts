import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

import { FIELDS } from "../config";
import type {
  FieldName,
  FormStatus,
  IContactErrors,
  IContactValues
} from "../config";
import {
  selectReset,
  selectSetFocused,
  selectSetSending,
  selectSetValue,
  selectValues,
  useContactStore
} from "../model";

import { sendMessage } from "./send-message";
import { validateAll, validateField } from "./validate";

type FieldElement = HTMLInputElement | HTMLTextAreaElement;

// Keeps the fields' elements and focuses the one named in `focusNext` after the next render of
// the errors or status: the render that sets aria-invalid/aria-describedby (or mounts the form again).
const useFieldFocus = (errors: IContactErrors, status: FormStatus) => {
  const elements = useRef<Partial<Record<FieldName, FieldElement | null>>>({});
  const focusNext = useRef<FieldName | null>(null);

  useEffect(() => {
    if (!focusNext.current) return;
    elements.current[focusNext.current]?.focus();
    focusNext.current = null;
  }, [errors, status]);

  const register = (field: FieldName) => (element: FieldElement | null) => {
    elements.current[field] = element;
  };

  const focusAfterRender = (field: FieldName) => {
    focusNext.current = field;
  };

  return { register, focusAfterRender };
};

// Sends the values (a bot's honeypot counts as sent) and tells the preview while it is on its way.
const deliver = async (
  values: IContactValues,
  bot: boolean,
  setSending: (sending: boolean) => void
) => {
  setSending(true);
  const sent = bot || (await sendMessage(values));
  setSending(false);
  return sent;
};

// State and handlers of the form. Validation runs on blur and on submit (then it follows typing
// in a field that already shows an error); a failed submit focuses the first invalid field.
export const useContactForm = () => {
  const values = useContactStore(selectValues);
  const setValue = useContactStore(selectSetValue);
  const reset = useContactStore(selectReset);
  const setSending = useContactStore(selectSetSending);
  const setFocused = useContactStore(selectSetFocused);
  const [errors, setErrors] = useState<IContactErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [attempt, setAttempt] = useState(0);
  // Submits that found invalid fields: each one shakes them.
  const [rejected, setRejected] = useState(0);
  const { register, focusAfterRender } = useFieldFocus(errors, status);
  const inFlight = useRef(false);

  const check = (field: FieldName, value: string) =>
    setErrors(current => ({
      ...current,
      [field]: validateField(field, value)
    }));

  const change = (field: FieldName, value: string) => {
    setValue(field, value);
    if (errors[field]) check(field, value);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // The form lingers while it fades out after a success: no second send.
    if (inFlight.current || status === "success") return;
    const found = validateAll(values);
    setErrors(found);
    const invalid = FIELDS.find(field => found[field]);
    if (invalid) {
      focusAfterRender(invalid);
      setRejected(count => count + 1);
      return;
    }
    // The honeypot: a filled hidden checkbox is a bot, which is told the message went through.
    const trap = new FormData(event.currentTarget).get("botcheck");
    inFlight.current = true;
    setStatus("sending");
    const sent = await deliver(values, Boolean(trap), setSending);
    inFlight.current = false;
    // Enter unmounts the focused field without a blur: the preview must not keep its caret.
    if (sent) setFocused(null);
    setAttempt(count => count + 1);
    setStatus(sent ? "success" : "error");
  };

  const again = () => {
    reset();
    focusAfterRender("name");
    setErrors({});
    setStatus("idle");
  };

  return {
    values,
    errors,
    status,
    attempt,
    rejected,
    register,
    change,
    check,
    submit,
    again
  };
};

export type ContactFormState = ReturnType<typeof useContactForm>;
