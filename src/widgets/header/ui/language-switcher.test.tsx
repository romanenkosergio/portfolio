import { screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { renderWithIntl } from "@/shared/lib/test";

import LanguageSwitcher from "./language-switcher";

describe("LanguageSwitcher", () => {
  it("shows the language at once and hands over to the select once loaded", async () => {
    const { container } = renderWithIntl(<LanguageSwitcher />);
    expect(screen.getByRole("button", { name: /language/i })).toBeVisible();

    const select = await screen.findByRole("combobox", { name: /language/i });
    expect(select).toHaveAttribute("data-state", "closed");
    expect(await axe(container)).toHaveNoViolations();
  });
});
