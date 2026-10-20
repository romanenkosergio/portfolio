import type { FC } from "react";

import { useTranslations } from "next-intl";

import { PROJECTS } from "@/entities/project";

import { ProjectsExplorer } from "../projects-explorer";

// Resolves every text on the server; the explorer below only filters and lays out.
const ProjectsView: FC = () => {
  const t = useTranslations("projects");

  const items = PROJECTS.map(project => ({
    ...project,
    title: t(`items.${project.slug}.title`),
    domain: t(`items.${project.slug}.domain`),
    role: t(`items.${project.slug}.role`),
    summary: t(`items.${project.slug}.summary`)
  }));

  return (
    <ProjectsExplorer
      items={items}
      copy={{
        heading: t("heading"),
        filterTitle: t("filter.title"),
        filterLabel: t("filter.label"),
        all: t("filter.all"),
        clear: t("filter.clear"),
        personal: t("card.personal"),
        stack: t("card.stack"),
        separator: t("card.separator"),
        empty: t("empty"),
        numbers: items.map((_, index) => t("card.label", { n: index + 1 }))
      }}
    />
  );
};

export default ProjectsView;
