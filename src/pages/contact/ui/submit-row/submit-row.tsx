import type { FC } from "react";

import { useTranslations } from "next-intl";

import { CONTACT_EMAIL } from "@/shared/config";
import { Button } from "@/shared/ui";

import type { ISubmitRowProps } from "./submit-row.types";

// The submit button (disabled while sending) and the polite live region that carries a failure.
const SubmitRow: FC<ISubmitRowProps> = ({ status, attempt }) => {
  const t = useTranslations("contact");

  return (
    <div className="flex flex-col items-start gap-4">
      <Button
        type="submit"
        variant="default"
        disabled={status === "sending"}
        text={status === "sending" ? t("sending") : t("submit")}
      />
      <div
        role="status"
        aria-live="polite"
        aria-label={t("statusLabel")}
        className="min-h-5 text-sm text-accent-3"
      >
        <span key={`${status}-${attempt}`}>
          {status === "sending" && t("sending")}
          {status === "error" &&
            t.rich("failure", {
              mail: chunks => (
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  title={CONTACT_EMAIL}
                  className="underline"
                >
                  {chunks}
                </a>
              ),
              email: CONTACT_EMAIL
            })}
        </span>
      </div>
    </div>
  );
};

export default SubmitRow;
