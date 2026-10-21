"use client";

import type { FC } from "react";

import { useTranslations } from "next-intl";

import { E_ROUTES } from "@/shared/config";
import { DISTANCE, DURATION } from "@/shared/lib/motion";
import { Button } from "@/shared/ui";
import { Reveal, ScrambleText } from "@/shared/ui/motion";

import { NotFoundTerminal, typingTime } from "../not-found-terminal";

import type { INotFoundContentProps } from "./not-found-content.types";

// Seconds the terminal waits before typing, so the 404 decodes first.
const TERMINAL_DELAY = DURATION.base;

// The 404 decodes, a terminal types the failed lookup, then the way back rises in.
const NotFoundContent: FC<INotFoundContentProps> = ({ path }) => {
  const t = useTranslations("notFound");
  const command = `${t("command")} ${path ?? ""}`;
  const errorDelay = TERMINAL_DELAY + typingTime(command) + DURATION.fast;
  const afterError = errorDelay + typingTime(t("error"));

  return (
    <section className="container flex flex-1 flex-col justify-center gap-6 py-12">
      <h1 className="text-[clamp(5rem,22vw,12rem)] leading-none font-medium text-white">
        <span className="sr-only">{t("pageTitle")}</span>
        <span aria-hidden="true">
          <ScrambleText>{t("title")}</ScrambleText>
        </span>
      </h1>
      <NotFoundTerminal
        path={path}
        delay={TERMINAL_DELAY}
        className="min-h-24 max-w-full rounded-lg border border-line bg-bg-2 p-4 text-sm break-all text-secondary-1"
      />
      <Reveal
        delay={afterError}
        y={DISTANCE.small}
        clearProps="opacity,transform"
      >
        <p className="text-base text-secondary-1">{t("description")}</p>
      </Reveal>
      <Reveal
        delay={afterError + DURATION.fast}
        y={DISTANCE.small}
        clearProps="opacity,transform"
      >
        <nav className="flex flex-wrap gap-4">
          <Button
            variant="primary"
            text={t("home")}
            title={t("homeTitle")}
            href={E_ROUTES.HOME}
          />
          <Button
            text={t("projects")}
            title={t("projectsTitle")}
            href={E_ROUTES.PROJECTS}
          />
          <Button
            text={t("contact")}
            title={t("contactTitle")}
            href={E_ROUTES.CONTACT}
          />
        </nav>
      </Reveal>
    </section>
  );
};

export default NotFoundContent;
