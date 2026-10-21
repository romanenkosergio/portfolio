import type { FC } from "react";

import { useTranslations } from "next-intl";

import { E_ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui";
import { Stagger } from "@/shared/ui/motion";

import { HERO_DELAY, HERO_STEP } from "@/pages/home/config";

/** The two calls to action under the hero text: projects first, contact second. */
const HeroActions: FC = () => {
  const t = useTranslations("home");
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <Stagger delay={HERO_DELAY.actions}>
        <Button
          href={E_ROUTES.PROJECTS}
          title={t("ctaProjectsTitle")}
          text={t("ctaProjects")}
          variant="primary"
        />
      </Stagger>
      <Stagger delay={HERO_DELAY.actions + HERO_STEP}>
        <Button
          href={E_ROUTES.CONTACT}
          title={t("ctaContactTitle")}
          text={t("ctaContact")}
          variant="ghost"
        />
      </Stagger>
    </div>
  );
};

export default HeroActions;
