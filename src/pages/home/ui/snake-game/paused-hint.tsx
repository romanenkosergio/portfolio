import type { FC } from "react";

import { useTranslations } from "next-intl";

import { Reveal } from "@/shared/ui/motion";

/** Eyes only: the status region on the board announces the pause to screen readers. */
const PausedHint: FC = () => {
  const t = useTranslations("game");
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-3 top-3 z-10"
    >
      <Reveal>
        <p className="rounded-lg bg-primary-2/90 py-2 text-center text-sm text-white">
          {t("pausedHint")}
        </p>
      </Reveal>
    </div>
  );
};

export default PausedHint;
