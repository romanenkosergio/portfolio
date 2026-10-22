import { screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { renderWithIntl } from "@/shared/lib/test";

import ContactSidebar from "./contact-sidebar";

describe("ContactSidebar", () => {
  it("offers the English CV as a download", () => {
    renderWithIntl(<ContactSidebar />);
    const link = screen.getByRole("link", { name: "serhii-romanenko-cv.pdf" });
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("/assets/cv/serhii-romanenko-cv.pdf")
    );
    expect(link).toHaveAttribute("download");
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithIntl(<ContactSidebar />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
