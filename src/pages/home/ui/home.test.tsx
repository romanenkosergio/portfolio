import { screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { CAREER_START } from "@/shared/config";
import { yearsSince } from "@/shared/lib";
import { renderWithIntl } from "@/shared/lib/test";

import HomeView from "./home";

describe("HomeView", () => {
  it("states the role and the years in the summary", () => {
    renderWithIntl(<HomeView />);
    const years = yearsSince(CAREER_START);
    expect(screen.getAllByText(/Frontend Lead/).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(new RegExp(`${years} years in frontend`)).length
    ).toBeGreaterThan(0);
  });

  it("links the two calls to action to projects and contact", () => {
    renderWithIntl(<HomeView />);
    expect(screen.getByRole("link", { name: "View projects" })).toHaveAttribute(
      "href",
      expect.stringContaining("/projects")
    );
    expect(screen.getByRole("link", { name: "Contact me" })).toHaveAttribute(
      "href",
      expect.stringContaining("/contact")
    );
  });

  it("lists the stack and has no axe violations", async () => {
    const { container } = renderWithIntl(<HomeView />);
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });
});
