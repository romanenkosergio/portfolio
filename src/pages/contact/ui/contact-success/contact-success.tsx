"use client";

import { useEffect, useRef } from "react";
import type { FC } from "react";

import { useTranslations } from "next-intl";

import { Button } from "@/shared/ui";

import type { IContactSuccessProps } from "./contact-success.types";

// Replaces the form once the message is accepted; the button starts a fresh one.
const ContactSuccess: FC<IContactSuccessProps> = ({ onAgain }) => {
  const t = useTranslations("contact.success");

  const titleRef = useRef<HTMLHeadingElement>(null);

  // The form this replaces held focus; moving it to the thank-you also has it read out.
  useEffect(() => titleRef.current?.focus(), []);

  return (
    <div role="status" className="flex flex-col items-start gap-6 py-4">
      <h2
        ref={titleRef}
        tabIndex={-1}
        className="text-lg font-normal text-white"
      >
        {t("title")}
      </h2>
      <p className="text-base text-secondary-1">{t("text")}</p>
      <Button variant="primary" text={t("again")} onClick={onAgain} />
    </div>
  );
};

export default ContactSuccess;
