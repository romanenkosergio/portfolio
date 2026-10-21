"use client";

import { useRef } from "react";
import type { FC } from "react";

import {
  useContactForm,
  useFieldShake,
  useFormEntrance,
  useFormView
} from "@/pages/contact/lib";

import { ContactFields } from "../contact-fields";
import { ContactSuccess } from "../contact-success";

// The form pane. The form fades out into the thank-you once the message is sent, and «send new
// message» reverses it; both panes sit in one root so the swap and the shake can find them.
// A polite live region (in the submit row) announces sending, success and failure.
const ContactForm: FC = () => {
  const form = useContactForm();
  const rootRef = useRef<HTMLDivElement>(null);
  const { view, leave } = useFormView(rootRef, form.status);

  useFormEntrance(rootRef, view === "form");
  useFieldShake(rootRef, form.rejected);

  return (
    <div ref={rootRef}>
      {view === "success" ? (
        <ContactSuccess onAgain={() => leave(form.again)} />
      ) : (
        <ContactFields form={form} />
      )}
    </div>
  );
};

export default ContactForm;
