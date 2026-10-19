"use client";

import type { FC } from "react";

import { E_ROUTES } from "@/shared/config";
import { Button, E_BUTTON_VARIANT } from "@/shared/ui";

import { useSnakeStore } from "@/pages/home/model";

const WinButton: FC = () => {
  const { isVin } = useSnakeStore();
  return (
    <Button
      href={E_ROUTES.ABOUT_ME}
      title="About me"
      text={isVin ? "next" : "skip"}
      variant={E_BUTTON_VARIANT.GHOST}
      className={`mt-auto ml-auto ${isVin === null && "-z-1 opacity-0"}`}
    />
  );
};

export default WinButton;
