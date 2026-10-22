import type { FC } from "react";

import { useTranslations } from "next-intl";

import { CV_URL, E_ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui";
import { Stagger } from "@/shared/ui/motion";

import { HERO_DELAY, HERO_STEP } from "@/pages/home/config";

/** The calls to action under the hero text: projects first, contact second, the CV download last. */
const HeroActions: FC = () => {
  const t = useTranslations("home");
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <Stagger afterLoad delay={HERO_DELAY.actions}>
        <Button
          href={E_ROUTES.PROJECTS}
          title={t("ctaProjectsTitle")}
          text={t("ctaProjects")}
          variant="primary"
        />
      </Stagger>
      <Stagger afterLoad delay={HERO_DELAY.actions + HERO_STEP}>
        <Button
          href={E_ROUTES.CONTACT}
          title={t("ctaContactTitle")}
          text={t("ctaContact")}
          variant="ghost"
        />
      </Stagger>
      <Stagger afterLoad delay={HERO_DELAY.actions + HERO_STEP * 2}>
        <Button
          href={CV_URL}
          isExternalLink
          download
          icon="download"
          title={t("ctaCvTitle")}
          text={t("ctaCv")}
          variant="ghost"
        />
      </Stagger>
    </div>
  );
};

export default HeroActions;
