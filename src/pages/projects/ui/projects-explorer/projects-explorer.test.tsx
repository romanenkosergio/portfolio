import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { renderWithIntl } from "@/shared/lib/test";

import ProjectsExplorer from "./projects-explorer";

const copy = {
  heading: "Projects",
  filterTitle: "projects",
  filterLabel: "Filter by technology",
  all: "all-projects",
  clear: "Clear filter",
  empty: "Nothing here."
};

const cards = [
  {
    slug: "a",
    featured: false,
    stack: ["react", "typescript"],
    node: <p>Card A</p>
  },
  { slug: "b", featured: false, stack: ["vue"], node: <p>Card B</p> },
  { slug: "c", featured: false, stack: ["django"], node: <p>Card C</p> }
] as const;

const filters = (["react", "vue", "django"] as const).map(tech => ({
  tech,
  node: <span>{tech}</span>
}));

const setup = () =>
  renderWithIntl(
    <ProjectsExplorer cards={cards} filters={filters} copy={copy} />
  );

/** A card is "hidden" when its wrapper carries the `hidden` class. */
const hidden = (text: string) =>
  screen.getByText(text).parentElement?.classList.contains("hidden");

describe("ProjectsExplorer", () => {
  it("has no accessibility violations", async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("shows every card with nothing checked", () => {
    setup();
    expect(hidden("Card A")).toBe(false);
    expect(hidden("Card B")).toBe(false);
    expect(hidden("Card C")).toBe(false);
    expect(screen.getByText("all-projects")).toBeInTheDocument();
  });

  it("hides the cards that use none of the checked techs, and names the tab", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole("checkbox", { name: "vue" }));
    await user.click(screen.getByRole("checkbox", { name: "react" }));

    expect(hidden("Card A")).toBe(false);
    expect(hidden("Card B")).toBe(false);
    expect(hidden("Card C")).toBe(true);
    // The tab lists the checked techs in sidebar order.
    expect(screen.getByText("React; Vue")).toBeInTheDocument();
  });

  it("unchecking brings the cards back", async () => {
    const user = userEvent.setup();
    setup();
    const react = screen.getByRole("checkbox", { name: "react" });
    await user.click(react);
    expect(hidden("Card B")).toBe(true);
    await user.click(react);
    expect(hidden("Card B")).toBe(false);
  });

  it("the × clears the filter and focuses the first checkbox", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole("checkbox", { name: "django" }));
    expect(hidden("Card A")).toBe(true);

    await user.click(screen.getByRole("button", { name: "Clear filter" }));

    expect(hidden("Card A")).toBe(false);
    expect(screen.queryByRole("button", { name: "Clear filter" })).toBeNull();
    expect(screen.getByRole("checkbox", { name: "react" })).toHaveFocus();
  });

  it("filters sit in a labelled aside with one checkbox each", () => {
    setup();
    const aside = screen.getByRole("complementary", { name: copy.filterLabel });
    expect(within(aside).getAllByRole("checkbox")).toHaveLength(3);
  });
});
