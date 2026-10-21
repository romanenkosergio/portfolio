import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { COVER_LOGO_ATTR, COVER_PATTERN_ATTR } from "@/entities/project/config";
import type { CoverPattern } from "@/entities/project/model";

import ProjectBanner from "./project-banner";

const project = (pattern: CoverPattern) =>
  ({
    slug: "saas-platform",
    kind: "commercial",
    stack: ["react", "typescript"],
    cover: { tech: "typescript", pattern },
    title: "_saas",
    domain: "SaaS",
    role: "Lead",
    summary: "Text."
  }) as const;

describe("ProjectBanner", () => {
  it.each([0, 1, 2, 3] as const)(
    "draws pattern %i, one logo and the badge, with nothing for axe to flag",
    async pattern => {
      const { container, getByText } = render(
        <ProjectBanner project={project(pattern)} badge="commercial · NDA" />
      );

      expect(getByText("commercial · NDA")).toBeInTheDocument();
      expect(container.querySelectorAll(`[${COVER_LOGO_ATTR}]`)).toHaveLength(
        1
      );
      expect(
        container.querySelectorAll(`[${COVER_PATTERN_ATTR}]`)
      ).toHaveLength(1);
      expect(container.querySelector("pattern") !== null).toBe(pattern < 3);
      expect(await axe(container)).toHaveNoViolations();
    }
  );
});
