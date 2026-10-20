import type { FC } from "react";

import { useTranslations } from "next-intl";

import { Container } from "@/shared/ui";
import { ScrambleText, TypeText } from "@/shared/ui/motion";

import { HERO_DELAY } from "@/pages/home/config";

import HeroCode from "./hero-code";
import { SnakeGame } from "./snake-game";

const HomeView: FC = () => {
  const t = useTranslations("home");
  return (
    <section className="flex-1 overflow-x-clip desktop:flex desktop:min-h-fit desktop:shrink-0 desktop:items-center desktop:overflow-clip">
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
              <TypeText caret delay={HERO_DELAY.role}>
                {t("role")}
              </TypeText>
            </h2>
            <HeroCode />
          </div>
          <SnakeGame />
        </div>
      </Container>
    </section>
  );
};

export default HomeView;
