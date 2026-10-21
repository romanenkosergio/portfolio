import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import ProjectCard from "./project-card";

const project = {
  slug: "saas-platform",
  kind: "personal",
  stack: ["react", "typescript"],
  cover: { tech: "react", pattern: 0 },
  title: "_dareboard",
  domain: "Games",
  role: "Author",
  summary: "A small game.",
  href: "https://example.com/game"
} as const;

const labels = {
  number: "Project 1",
  separator: "//",
  personal: "personal",
  commercial: "commercial · NDA",
  stack: "Stack",
  view: "view-project",
  viewTitle: "Open dareboard website"
};

describe("ProjectCard", () => {
  it("links out safely, with a title, when the project has a href", async () => {
    const { container } = render(
      <ProjectCard project={project} labels={labels} />
    );

    const link = screen.getByRole("link", { name: "view-project" });
    expect(link).toHaveAttribute("href", project.href);
    expect(link).toHaveAttribute("title", labels.viewTitle);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no link without a href", () => {
    render(
      <ProjectCard project={{ ...project, href: undefined }} labels={labels} />
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("marks personal projects only", () => {
    const { rerender } = render(
      <ProjectCard project={project} labels={labels} />
    );
    expect(screen.getByText("personal")).toBeInTheDocument();

    rerender(
      <ProjectCard
        project={{ ...project, kind: "commercial" }}
        labels={labels}
      />
    );
    expect(screen.queryByText("personal")).not.toBeInTheDocument();
    expect(screen.getByText("commercial · NDA")).toBeInTheDocument();
  });

  it("lists one badge per distinct icon under the stack label", () => {
    render(<ProjectCard project={project} labels={labels} />);
    expect(screen.getByRole("list", { name: "Stack" })).toBeInTheDocument();
  });
});
