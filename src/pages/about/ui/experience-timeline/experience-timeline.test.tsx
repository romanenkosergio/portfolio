import { screen, within } from "@testing-library/react";
import { axe } from "jest-axe";

import { renderWithIntl } from "@/shared/lib/test";

import { EXPERIENCE_IDS } from "@/pages/about/config";

import ExperienceTimeline from "./experience-timeline";

describe("ExperienceTimeline", () => {
  it("has no accessibility violations", async () => {
    const { container } = renderWithIntl(<ExperienceTimeline />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("lists every job as an entry with a role heading", () => {
    renderWithIntl(<ExperienceTimeline />);
    const list = screen.getAllByRole("list")[0];
    expect(within(list).getAllByRole("heading", { level: 3 })).toHaveLength(
      EXPERIENCE_IDS.length
    );
    expect(
      screen.getByRole("heading", { level: 2, name: /Experience/ })
    ).toBeInTheDocument();
  });

  it("highlights the promotion metric", () => {
    renderWithIntl(<ExperienceTimeline />);
    expect(screen.getByText("4 months").tagName).toBe("MARK");
  });
});
