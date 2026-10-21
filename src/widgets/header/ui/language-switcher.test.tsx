import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { renderWithIntl } from "@/shared/lib/test";

import LanguageSwitcher from "./language-switcher";

const readyState = (state: DocumentReadyState) =>
  jest.spyOn(document, "readyState", "get").mockReturnValue(state);

// jsdom lacks what the open list of a Radix select calls.
beforeAll(() => {
  Element.prototype.scrollIntoView = jest.fn();
  Element.prototype.hasPointerCapture = jest.fn();
});

afterEach(() => jest.restoreAllMocks());

describe("LanguageSwitcher", () => {
  it("shows the language at once and hands over to the select once loaded", async () => {
    const { container } = renderWithIntl(<LanguageSwitcher />);
    expect(screen.getByRole("button", { name: /language/i })).toBeVisible();

    const select = await screen.findByRole("combobox", { name: /language/i });
    expect(select).toHaveAttribute("data-state", "closed");
    expect(await axe(container)).toHaveNoViolations();
  });

  it("keeps the focus the stand-in had across the swap", async () => {
    renderWithIntl(<LanguageSwitcher />);
    screen.getByRole("button", { name: /language/i }).focus();

    const select = await screen.findByRole("combobox", { name: /language/i });
    expect(select).toHaveFocus();
  });

  it("opens the list on a click made before the page has loaded", async () => {
    readyState("interactive");
    const user = userEvent.setup();
    renderWithIntl(<LanguageSwitcher />);
    await user.click(screen.getByRole("button", { name: /language/i }));

    const select = await screen.findByRole("combobox", {
      name: /language/i,
      hidden: true
    });
    expect(select).toHaveAttribute("aria-expanded", "true");
  });

  it("opens on ArrowDown too, and never before it is asked", async () => {
    readyState("interactive");
    const user = userEvent.setup();
    renderWithIntl(<LanguageSwitcher />);
    const standIn = screen.getByRole("button", { name: /language/i });
    expect(standIn).toHaveAttribute("aria-expanded", "false");

    standIn.focus();
    await user.keyboard("{ArrowDown}");
    const select = await screen.findByRole("combobox", {
      name: /language/i,
      hidden: true
    });
    expect(select).toHaveAttribute("aria-expanded", "true");
  });
});
