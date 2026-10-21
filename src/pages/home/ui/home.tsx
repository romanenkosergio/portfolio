import type { FC } from "react";

import { useTranslations } from "next-intl";

import { CAREER_START } from "@/shared/config";
import { yearsSince } from "@/shared/lib";
import { Container } from "@/shared/ui";
import { ScrambleText, TypeText } from "@/shared/ui/motion";

import { HERO_DELAY, HERO_SPEED } from "@/pages/home/config";

import HeroActions from "./hero-actions";
import HeroCode from "./hero-code";
import HeroStats from "./hero-stats";
import { SnakeGame } from "./snake-game";

const HomeView: FC = () => {
  const t = useTranslations("home");
  // Evaluated at build time (static export): the number refreshes on each build/deploy.
  const years = yearsSince(CAREER_START);
  return (
    <section className="flex-1 overflow-x-clip py-6 desktop:flex desktop:min-h-fit desktop:shrink-0 desktop:items-center desktop:overflow-clip desktop:py-0">
      <Container className="desktop:w-full">
        <div className="desktop:flex desktop:items-center desktop:justify-between">
          <div className="text-white">
            <p className="text-lg text-light">
              <TypeText caret keepCaret={false} delay={HERO_DELAY.greeting}>
                {t("greeting")}
              </TypeText>
            </p>
            <h1 className="mt-2.5 text-6xl text-light desktop:mt-0">
              <ScrambleText delay={HERO_DELAY.name}>{t("name")}</ScrambleText>
            </h1>
            <h2 className="mt-1 text-3xl text-secondary-3">
              <TypeText
                caret
                keepCaret={false}
                speed={HERO_SPEED.role}
                delay={HERO_DELAY.role}
              >
                {t("role")}
              </TypeText>
            </h2>
            <p className="text-md mt-4 max-w-[34rem] text-light">
              <TypeText
                caret
                speed={HERO_SPEED.summary}
                delay={HERO_DELAY.summary}
              >
                {t("summary", { years })}
              </TypeText>
            </p>
            <HeroActions />
            <HeroCode />
          </div>
          <SnakeGame />
        </div>
        <HeroStats />
      </Container>
    </section>
  );
};

export default HomeView;
