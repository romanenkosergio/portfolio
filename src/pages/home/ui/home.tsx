import type { FC } from "react";

import { useTranslations } from "next-intl";

import { GITHUB_URL } from "@/shared/config";
import { Container } from "@/shared/ui";
import { Reveal, ScrambleText, SplitReveal, Stagger } from "@/shared/ui/motion";

import { SnakeGame } from "./snake-game";

const GITHUB_LINK_TEXT = `"${GITHUB_URL}"`;

const HomeView: FC = () => {
  const t = useTranslations("home");
  return (
    <section className="flex-1 overflow-x-clip desktop:flex desktop:min-h-fit desktop:shrink-0 desktop:items-center desktop:overflow-clip">
      <Container className="desktop:w-full">
        <div className="desktop:flex desktop:items-center desktop:justify-between">
          <div className="text-white">
            <span className="block text-lg text-light">
              <Reveal as="span" className="block">
                {t("greeting")}
              </Reveal>
            </span>
            <h1 className="mt-2.5 text-6xl text-light desktop:mt-0">
              <ScrambleText delay={0.2}>{t("name")}</ScrambleText>
            </h1>
            <h2 className="mt-1 text-3xl text-secondary-3">
              <SplitReveal split="words" delay={0.5}>
                {t("role")}
              </SplitReveal>
            </h2>
            <Stagger className="mt-20" delay={0.9}>
              <p className="text-md text-secondary-1">{t("hint")}</p>
              <p className="mt-2.5">
                <span className="text-secondary-3">{t("constKeyword")}</span>
                <span className="text-accent-2"> {t("linkName")}</span>{" "}
                {t("assign")}{" "}
                <a
                  title={t("linkTitle")}
                  rel="nofollow noreferrer"
                  target="_blank"
                  className="relative mt-2.5 text-accent-1 underline-offset-4 desktop:before:absolute desktop:before:bottom-0 desktop:before:left-0 desktop:before:block desktop:before:h-0.25 desktop:before:w-full desktop:before:bg-accent-1 desktop:before:opacity-0 desktop:before:transition-opacity desktop:before:duration-300 desktop:before:ease-in-out desktop:before:content-[''] desktop:hover:before:opacity-90"
                  href={GITHUB_URL}
                >
                  {GITHUB_LINK_TEXT}
                </a>
              </p>
            </Stagger>
          </div>
          <SnakeGame />
        </div>
      </Container>
    </section>
  );
};

export default HomeView;
