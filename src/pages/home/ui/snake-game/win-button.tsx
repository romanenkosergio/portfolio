"use client";

import type { FC } from "react";

import { E_ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui";

import { selectIsWin, useSnakeStore } from "@/pages/home/model";

const WinButton: FC = () => {
  const isVin = useSnakeStore(selectIsWin);
  return (
    <Button
      href={E_ROUTES.ABOUT_ME}
      title="About me"
      text={isVin ? "next" : "skip"}
      variant="ghost"
      className="mt-auto ml-auto"
    />
  );
};

export default WinButton;
