"use client";

import { useId } from "react";
import type { FC } from "react";

import { useTranslations } from "next-intl";

import { PENDING_ATTR } from "@/shared/lib/motion";

import { LIMITS } from "@/pages/contact/config";
import type { FieldName } from "@/pages/contact/config";
import { selectSetFocused, useContactStore } from "@/pages/contact/model";

import { FormField } from "../form-field";
import { SubmitRow } from "../submit-row";

import type { IContactFieldsProps } from "./contact-fields.types";

const AUTOCOMPLETE: Record<FieldName, string> = {
  name: "name",
  email: "email",
  message: "off"
};

const FIELD_ROWS = [
  { name: "name", multiline: false, type: "text" },
  { name: "email", multiline: false, type: "email" },
  { name: "message", multiline: true, type: "text" }
] as const;

// The form itself: three validated fields, the honeypot and the submit row. Pending (hidden)
// until the entrance owns it; a focused field tells the preview where to put its caret.
const ContactFields: FC<IContactFieldsProps> = ({ form }) => {
  const t = useTranslations("contact");
  const prefix = useId();
  const setFocused = useContactStore(selectSetFocused);
  const { values, errors, status, attempt, register, change, check, submit } =
    form;

  const fieldError = (field: FieldName) => {
    const key = errors[field];
    return key
      ? t(`errors.${key}`, {
          min: LIMITS.messageMin,
          max: field === "name" ? LIMITS.nameMax : LIMITS.messageMax
        })
      : undefined;
  };

  return (
    <form
      noValidate
      aria-label={t("formLabel")}
      onSubmit={submit}
      className="flex max-w-135 flex-col"
      {...{ [PENDING_ATTR]: "" }}
    >
      {FIELD_ROWS.map(field => (
        <FormField
          key={field.name}
          id={`${prefix}-${field.name}`}
          name={field.name}
          label={t(`fields.${field.name}`)}
          value={values[field.name]}
          error={fieldError(field.name)}
          multiline={field.multiline}
          type={field.type}
          autoComplete={AUTOCOMPLETE[field.name]}
          inputRef={register(field.name)}
          onChange={value => change(field.name, value)}
          onFocus={() => setFocused(field.name)}
          onBlur={() => {
            setFocused(null);
            check(field.name, values[field.name]);
          }}
        />
      ))}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-label={t("botcheck")}
        className="hidden"
      />
      <SubmitRow status={status} attempt={attempt} />
    </form>
  );
};

export default ContactFields;
