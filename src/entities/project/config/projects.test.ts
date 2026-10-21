import { featuredFirst } from "../model/order";

import { PROJECTS } from "./projects";

describe("PROJECTS covers", () => {
  it("draw a logo of a tech the project uses", () => {
    PROJECTS.forEach(({ cover, stack }) => expect(stack).toContain(cover.tech));
  });

  it("never repeat a logo or a pattern on neighbouring cards, in the order shown", () => {
    const shown = featuredFirst(PROJECTS);
    shown.slice(1).forEach((project, index) => {
      const previous = shown[index].cover;
      expect(project.cover.tech).not.toBe(previous.tech);
      expect(project.cover.pattern).not.toBe(previous.pattern);
    });
  });
});
