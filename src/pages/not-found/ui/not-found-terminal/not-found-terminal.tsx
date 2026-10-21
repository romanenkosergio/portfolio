"use client";

import type { FC } from "react";

import { useTranslations } from "next-intl";

import { DURATION, TYPE } from "@/shared/lib/motion";
import { TypeText } from "@/shared/ui/motion";

import type { INotFoundTerminalProps } from "./not-found-terminal.types";

/** Seconds a line takes to type. */
export const typingTime = (text: string) => text.length / TYPE.speed;

/** The failed lookup, typed like a shell: the command, then its error. */
const NotFoundTerminal: FC<INotFoundTerminalProps> = ({
  path,
  delay,
  className
}) => {
  const t = useTranslations("notFound");
  const command = `${t("command")} ${path ?? ""}`;
  const errorDelay = delay + typingTime(command) + DURATION.fast;
  return (
    <div role="status" className={className}>
      {path !== null && (
        <>
          <p className="text-white">
            <TypeText delay={delay}>{command}</TypeText>
          </p>
          <p className="text-accent-1">
            <TypeText delay={errorDelay} caret>
              {t("error")}
            </TypeText>
          </p>
        </>
      )}
    </div>
  );
};

export default NotFoundTerminal;
