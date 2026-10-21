import { closeTab, openTab } from "./tabs";

describe("about tabs", () => {
  it("opens a tab at the end, once", () => {
    expect(openTab(["bio"], "skills")).toEqual(["bio", "skills"]);
    expect(openTab(["bio", "skills"], "bio")).toEqual(["bio", "skills"]);
  });

  it("closes a tab and shows the right neighbour", () => {
    expect(closeTab(["bio", "skills", "games"], "skills")).toEqual({
      tabs: ["bio", "games"],
      next: "games"
    });
  });

  it("falls back to the left neighbour when the last tab closes", () => {
    expect(closeTab(["bio", "skills"], "skills")).toEqual({
      tabs: ["bio"],
      next: "bio"
    });
  });

  it("leaves nothing to show when the only tab closes", () => {
    expect(closeTab(["bio"], "bio")).toEqual({ tabs: [], next: undefined });
  });
});
