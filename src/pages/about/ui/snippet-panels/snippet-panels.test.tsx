import { screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { renderWithIntl } from "@/shared/lib/test";

import { byType } from "@/pages/about/lib";

import SnippetPanels from "./snippet-panels";

const panels = byType(type => <p>{`snippets of ${type}`}</p>);

const mockPathname = jest.fn(() => "/en");
jest.mock("@/shared/i18n", () => ({
  ...jest.requireActual("@/shared/i18n"),
  usePathname: () => mockPathname()
}));

describe("SnippetPanels", () => {
  it("shows only the snippets of the open file (bio on the index)", () => {
    renderWithIntl(<SnippetPanels panels={panels} />);
    expect(screen.getByText("snippets of bio")).toBeVisible();
    expect(screen.getByText("snippets of games")).not.toBeVisible();
  });

  it("shows the snippets of another file by its route", () => {
    mockPathname.mockReturnValueOnce("/about-me/hobbies/games");
    renderWithIntl(<SnippetPanels panels={panels} />);
    expect(screen.getByText("snippets of games")).toBeVisible();
    expect(screen.getByText("snippets of bio")).not.toBeVisible();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithIntl(<SnippetPanels panels={panels} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
