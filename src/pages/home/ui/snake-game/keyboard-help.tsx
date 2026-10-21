import type { FC } from "react";

import { useTranslations } from "next-intl";

import KeyboardArrow from "./keyboard-arrow";

const KeyboardHelp: FC = () => {
  const t = useTranslations("game");
  return (
    <div className="h-35.5 w-45.25 rounded-lg bg-primary-5/19 px-3 py-4">
      <p className="text-sm leading-4.5 text-white pointer-coarse:hidden">
        {t("useKeyboard")}
      </p>
      <p className="text-sm leading-4.5 text-white pointer-coarse:hidden">
        {t("arrowsToPlay")}
      </p>
      <p className="hidden text-sm leading-4.5 text-white pointer-coarse:block">
        {t("swipeBoard")}
      </p>
      <p className="hidden text-sm leading-4.5 text-white pointer-coarse:block">
        {t("orTapArrows")}
      </p>
      <div className="mt-4 flex flex-col gap-1.25">
        <div className="flex w-full items-center justify-center">
          <KeyboardArrow direction="UP" />
        </div>
        <div className="flex w-full items-center gap-1.25">
          <KeyboardArrow direction="LEFT" />
          <KeyboardArrow direction="DOWN" />
          <KeyboardArrow direction="RIGHT" />
        </div>
      </div>
    </div>
  );
};

export default KeyboardHelp;
