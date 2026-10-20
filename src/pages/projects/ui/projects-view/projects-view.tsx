import type { FC } from "react";

import { useTranslations } from "next-intl";

import { TechIcon } from "@/shared/ui/tech-icon";

import {
  PROJECTS,
  ProjectCard,
  TECHS,
  usedFilterTechs
} from "@/entities/project";

import { ProjectsExplorer } from "../projects-explorer";

// Everything visible is rendered here, on the server (so the tech logos stay out of the client
// bundle); the explorer below only keeps the checked set and hides what does not match.
const ProjectsView: FC = () => {
  const t = useTranslations("projects");

  const cards = PROJECTS.map((project, index) => ({
    slug: project.slug,
    stack: project.stack,
    node: (
      <ProjectCard
        project={{
          ...project,
          title: t(`items.${project.slug}.title`),
          domain: t(`items.${project.slug}.domain`),
          role: t(`items.${project.slug}.role`),
          summary: t(`items.${project.slug}.summary`)
        }}
        labels={{
          number: t("card.label", { n: index + 1 }),
          separator: t("card.separator"),
          personal: t("card.personal"),
          stack: t("card.stack")
        }}
      />
    )
  }));

  const filters = usedFilterTechs().map(tech => ({
    tech,
    node: (
      <>
        <TechIcon name={TECHS[tech].icon} className="size-6 flex-none" />
        {TECHS[tech].label}
      </>
    )
  }));

  return (
    <ProjectsExplorer
      cards={cards}
      filters={filters}
      copy={{
        heading: t("heading"),
        filterTitle: t("filter.title"),
        filterLabel: t("filter.label"),
        all: t("filter.all"),
        clear: t("filter.clear"),
        empty: t("empty")
      }}
    />
  );
};

export default ProjectsView;
