import { createRef } from "react";

import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";

import TechFilter from "./tech-filter";

const props = {
  title: "projects",
  label: "Filter by technology",
  filters: [{ tech: "react", node: <span>React</span> }],
  checked: [],
  onToggle: jest.fn(),
  firstRef: createRef<HTMLInputElement>()
} as const;

describe("TechFilter", () => {
  it("renders the checkboxes inert on the server, so a click before hydration cannot tick one without filtering", () => {
    expect(renderToString(<TechFilter {...props} />)).toContain("disabled");
  });

  it("enables them once hydrated", () => {
    render(<TechFilter {...props} />);
    expect(screen.getByRole("checkbox")).toBeEnabled();
  });
});
