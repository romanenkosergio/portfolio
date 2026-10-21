import type { FC } from "react";

import { useMessages, useTranslations } from "next-intl";

import { Stagger } from "@/shared/ui/motion";

import { EXPERIENCE_IDS } from "@/pages/about/config";

import { Highlighted } from "./highlighted";
import { TimelineRail } from "./timeline-rail";

// Experience as a timeline: a rail with a node per job, the role in accent, company and period
// muted, the bullets at body contrast. The comment header keeps the IDE flavour.
const ExperienceTimeline: FC = () => {
  const t = useTranslations("about.timeline");
  const { entries } = useMessages().about.timeline;
  const highlight = t("highlight");

  return (
    <section className="px-6 py-6 desktop:pl-9.5">
      <h2 className="mb-6 font-mono text-lg text-secondary-1">
        <span aria-hidden="true">{t("marker")} </span>
        {t("heading")}
      </h2>
      <Stagger
        eager
        selector="[data-entry]"
        stagger={0.06}
        className="relative"
      >
        <TimelineRail />
        <ol className="flex flex-col gap-8">
          {EXPERIENCE_IDS.map((id, index) => (
            <li key={id} data-entry="" className="relative pl-8">
              <span
                aria-hidden="true"
                className={
                  index === 0
                    ? "absolute top-2 left-0 size-[11px] rounded-full border-2 border-accent-1 bg-accent-1"
                    : "absolute top-2 left-0 size-[11px] rounded-full border-2 border-accent-1 bg-primary-2"
                }
              />
              <h3 className="text-xl font-bold text-accent-1">
                {t(`entries.${id}.role`)}
              </h3>
              <p className="mt-1 flex flex-col text-secondary-1 tablet:flex-row tablet:flex-wrap tablet:gap-x-3">
                <span>{t(`entries.${id}.company`)}</span>
                <span className="font-mono text-sm leading-7">
                  {t(`entries.${id}.period`)}
                </span>
              </p>
              <ul className="mt-3 flex flex-col gap-1.5 text-base leading-relaxed text-secondary-4">
                {Object.values(entries[id].bullets).map(bullet => (
                  <li key={bullet} className="flex gap-2">
                    <span aria-hidden="true" className="text-secondary-2">
                      –
                    </span>
                    <span className="min-w-0 break-words">
                      <Highlighted text={bullet} highlight={highlight} />
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Stagger>
    </section>
  );
};

export default ExperienceTimeline;
