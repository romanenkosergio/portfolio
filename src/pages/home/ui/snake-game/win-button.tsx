"use client";

import type { FC } from "react";

import { useTranslations } from "next-intl";

import { E_ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui";

import { selectIsWin, useSnakeStore } from "@/pages/home/model";

const WinButton: FC = () => {
  const t = useTranslations("game");
  const isVin = useSnakeStore(selectIsWin);
  return (
    <Button
      href={E_ROUTES.ABOUT_ME}
      title={t("aboutMeTitle")}
      text={isVin ? t("next") : t("skip")}
      variant="ghost"
      className="mt-5 ml-auto tablet:mt-auto"
    />
  );
};

export default WinButton;
