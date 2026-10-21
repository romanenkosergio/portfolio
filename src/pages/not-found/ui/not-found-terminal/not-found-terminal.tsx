"use client";

import type { FC } from "react";

import { useTranslations } from "next-intl";

import { DURATION, TYPE } from "@/shared/lib/motion";
import { TypeText } from "@/shared/ui/motion";

import type { INotFoundTerminalProps } from "./not-found-terminal.types";

const typingTime = (text: string) => text.length / TYPE.quick;

/** The command line and the seconds at which the error starts and the whole terminal ends. */
export const terminalPlan = (
  label: string,
  path: string | null,
  error: string,
  delay: number
) => {
  const command = `${label} ${path ?? ""}`;
  const errorDelay = delay + typingTime(command) + DURATION.fast;
  return { command, errorDelay, end: errorDelay + typingTime(error) };
};

/** The failed lookup, typed like a shell: the command, then its error. */
const NotFoundTerminal: FC<INotFoundTerminalProps> = ({
  path,
  delay,
  className
}) => {
  const t = useTranslations("notFound");
  const { command, errorDelay } = terminalPlan(
    t("command"),
    path,
    t("error"),
    delay
  );
  return (
    <div role="status" className={className}>
      {path !== null && (
        <>
          <p className="text-white">
            <TypeText delay={delay} speed={TYPE.quick}>
              {command}
            </TypeText>
          </p>
          <p className="text-accent-1">
            <TypeText delay={errorDelay} speed={TYPE.quick} caret>
              {t("error")}
            </TypeText>
          </p>
        </>
      )}
    </div>
  );
};

export default NotFoundTerminal;
