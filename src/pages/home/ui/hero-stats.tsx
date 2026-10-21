import type { FC } from "react";

import { useTranslations } from "next-intl";

import { CAREER_START } from "@/shared/config";
import { yearsSince } from "@/shared/lib";
import { Stagger } from "@/shared/ui/motion";
import { TechIcon, TechIconSprite } from "@/shared/ui/tech-icon";

import { TECHS } from "@/entities/project";

import { HERO_DELAY, HERO_STACK, HERO_STEP } from "@/pages/home/config";

interface IStatProps {
  value: string | number;
  label: string;
  /** Position in the strip: later items enter later. */
  index: number;
}

const Stat: FC<IStatProps> = ({ value, label, index }) => (
  <Stagger delay={HERO_DELAY.stats + index * HERO_STEP}>
    <p className="text-2xl text-accent-1">{value}</p>
    <p className="text-sm text-secondary-1">{label}</p>
  </Stagger>
);

/** A compact strip under the hero: facts from the CV and the main stack as logos. */
const HeroStats: FC = () => {
  const t = useTranslations("home");
  // Evaluated at build time (static export): the number refreshes on each build/deploy.
  const years = yearsSince(CAREER_START);
  return (
    <section
      aria-label={t("statsLabel")}
      className="mt-12 flex flex-wrap items-end gap-x-10 gap-y-6 border-t border-line pt-6 desktop:mt-10"
    >
      <TechIconSprite />
      <Stat index={0} value={years} label={t("statYears")} />
      <Stat index={1} value={t("statLeadValue")} label={t("statLead")} />
      <Stat index={2} value={t("statProductValue")} label={t("statProduct")} />
      <Stagger delay={HERO_DELAY.stats + 3 * HERO_STEP}>
        <p className="text-sm text-secondary-1">{t("stackLabel")}</p>
        <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
          {HERO_STACK.map(tech => (
            <li
              key={tech}
              className="flex items-center gap-2 text-sm text-light"
            >
              <TechIcon name={TECHS[tech].icon} className="size-5 flex-none" />
              {TECHS[tech].label}
            </li>
          ))}
        </ul>
      </Stagger>
    </section>
  );
};

export default HeroStats;
