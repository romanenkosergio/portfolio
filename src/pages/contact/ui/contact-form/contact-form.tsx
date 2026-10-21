"use client";

import { useId } from "react";
import type { FC } from "react";

import { useTranslations } from "next-intl";

import { LIMITS } from "@/pages/contact/config";
import type { FieldName } from "@/pages/contact/config";
import { useContactForm } from "@/pages/contact/lib";

import { ContactSuccess } from "../contact-success";
import { FormField } from "../form-field";
import { SubmitRow } from "../submit-row";

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

// The form pane: three validated fields, the honeypot and the submit button; once sent, the
// thank-you replaces it. A polite live region announces sending, success and failure.
const ContactForm: FC = () => {
  const t = useTranslations("contact");
  const prefix = useId();
  const { values, errors, status, register, change, check, submit, again } =
    useContactForm();

  const fieldError = (field: FieldName) => {
    const key = errors[field];
    return key
      ? t(`errors.${key}`, {
          min: LIMITS.messageMin,
          max: field === "name" ? LIMITS.nameMax : LIMITS.messageMax
        })
      : undefined;
  };

  if (status === "success") return <ContactSuccess onAgain={again} />;

  return (
    <form
      noValidate
      aria-label={t("formLabel")}
      onSubmit={submit}
      className="flex max-w-135 flex-col"
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
          onBlur={() => check(field.name, values[field.name])}
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
      <SubmitRow status={status} />
    </form>
  );
};

export default ContactForm;
