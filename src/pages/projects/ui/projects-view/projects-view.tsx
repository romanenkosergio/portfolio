import type { FC } from "react";

import { useTranslations } from "next-intl";

import { TechIcon, TechIconSprite } from "@/shared/ui/tech-icon";

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
    featured: "featured" in project,
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
          commercial: t("card.commercial"),
          stack: t("card.stack"),
          view: t("card.view"),
          viewTitle: t("card.viewTitle", {
            // The card title is file-like ("_dareboard"); the link title wants the plain name.
            title: t(`items.${project.slug}.title`).replace(/^_/, "")
          })
        }}
      />
    )
  }));
  // The featured card spans a full row; first in the DOM, it leaves no hole at any column count
  // (the label keeps its place in PROJECTS, so «Project 9» stays 9).
  const ordered = [...cards].sort(
    (a, b) => Number(b.featured) - Number(a.featured)
  );

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
    <>
      <TechIconSprite />
      <ProjectsExplorer
        cards={ordered}
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
    </>
  );
};

export default ProjectsView;
