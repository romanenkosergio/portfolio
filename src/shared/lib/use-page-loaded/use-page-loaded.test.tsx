import { act, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";

import { usePageLoaded } from "./use-page-loaded";

const Probe = () => <p>{usePageLoaded() ? "loaded" : "loading"}</p>;

describe("usePageLoaded", () => {
  it("is false on the server", () => {
    expect(renderToString(<Probe />)).toContain("loading");
  });

  it("is true once the document is complete", () => {
    render(<Probe />);
    expect(screen.getByText("loaded")).toBeInTheDocument();
  });

  it("flips on the load event", () => {
    const state = jest.spyOn(document, "readyState", "get");
    state.mockReturnValue("loading");
    render(<Probe />);
    expect(screen.getByText("loading")).toBeInTheDocument();

    state.mockReturnValue("complete");
    act(() => {
      window.dispatchEvent(new Event("load"));
    });
    expect(screen.getByText("loaded")).toBeInTheDocument();
    state.mockRestore();
  });
});
