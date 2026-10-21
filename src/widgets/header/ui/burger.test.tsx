import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { renderWithIntl } from "@/shared/lib/test";

import Burger from "./burger";

describe("Burger", () => {
  it("has no accessibility violations, closed or open", async () => {
    const user = userEvent.setup();
    const { container } = renderWithIntl(<Burger />);
    expect(await axe(container)).toHaveNoViolations();

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(await axe(container)).toHaveNoViolations();
  });

  it("toggles aria-expanded and its own label", async () => {
    const user = userEvent.setup();
    renderWithIntl(<Burger />);
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAccessibleName("Close menu");
    expect(button).toHaveAttribute("aria-controls");
  });

  it("moves focus into the menu, and Esc closes it and returns focus", async () => {
    const user = userEvent.setup();
    renderWithIntl(<Burger />);
    const button = screen.getByRole("button", { name: "Open menu" });
    await user.click(button);

    const [firstLink] = screen.getAllByRole("link");
    expect(firstLink).toHaveFocus();
    expect(document.documentElement).toHaveStyle({ overflow: "hidden" });

    await user.keyboard("{Escape}");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveFocus();
    expect(document.documentElement).not.toHaveStyle({ overflow: "hidden" });
  });

  it("wraps Tab between the burger and the last control", async () => {
    const user = userEvent.setup();
    renderWithIntl(<Burger />);
    const button = screen.getByRole("button", { name: "Open menu" });
    await user.click(button);

    await user.tab({ shift: true });
    expect(button).toHaveFocus();
    await user.tab({ shift: true });
    expect(button).not.toHaveFocus();
    await user.tab();
    expect(button).toHaveFocus();
  });
});
