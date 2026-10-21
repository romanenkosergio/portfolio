import type { FC, ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Reveal } from "@/shared/ui/motion";
import { TechIcon, TechIconSprite } from "@/shared/ui/tech-icon";

import { PROJECTS, TECHS } from "@/entities/project";

import { HERO_DELAY, HERO_STACK, HERO_STEP } from "@/pages/home/config";

interface IFactProps {
  /** Position in the strip: later items enter later. */
  index: number;
  children: ReactNode;
}

const Fact: FC<IFactProps> = ({ index, children }) => (
  <Reveal as="li" afterLoad delay={HERO_DELAY.stats + index * HERO_STEP}>
    {children}
  </Reveal>
);

/** A compact strip under the hero for wide screens: facts from the CV and the stack as logos. */
const HeroStats: FC = () => {
  const t = useTranslations("home");
  return (
    <section
      aria-label={t("statsLabel")}
      className="mt-10 hidden border-t border-line pt-5 desktop:block [@media(max-height:780px)]:hidden"
    >
      <TechIconSprite />
      <ul className="flex flex-wrap items-center gap-x-10 gap-y-3 text-sm text-light">
        <Fact index={0}>{t("statProjects", { count: PROJECTS.length })}</Fact>
        <Fact index={1}>{t("statTaught")}</Fact>
        <Fact index={2}>{t("statSelfTaught")}</Fact>
        <Reveal as="li" afterLoad delay={HERO_DELAY.stats + 3 * HERO_STEP}>
          <div className="flex items-center gap-4">
            <span className="text-secondary-1">{t("stackLabel")}</span>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {HERO_STACK.map(tech => (
                <li key={tech} className="flex items-center gap-2">
                  <TechIcon
                    name={TECHS[tech].icon}
                    className="size-5 flex-none"
                  />
                  {TECHS[tech].label}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </ul>
    </section>
  );
};

export default HeroStats;
