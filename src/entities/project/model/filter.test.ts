import { FILTER_TECHS, PROJECTS } from "../config";

import {
  matchesTechs,
  orderedTechs,
  toggleTech,
  usedFilterTechs
} from "./filter";

describe("project filter", () => {
  it("passes everything when nothing is checked", () => {
    expect(matchesTechs({ stack: ["react"] }, [])).toBe(true);
  });

  it("passes a project that uses ANY checked tech", () => {
    const project = { stack: ["react", "vue"] } as const;
    expect(matchesTechs(project, ["vue", "django"])).toBe(true);
    expect(matchesTechs(project, ["django"])).toBe(false);
  });

  it("toggles a tech without mutating the input", () => {
    const checked = ["react"] as const;
    expect(toggleTech(checked, "vue")).toEqual(["react", "vue"]);
    expect(toggleTech(checked, "react")).toEqual([]);
    expect(checked).toEqual(["react"]);
  });

  it("orders checked techs as the sidebar lists them", () => {
    const reversed = [...FILTER_TECHS].reverse().slice(0, 3);
    const ordered = orderedTechs(reversed);
    expect(ordered).toEqual(FILTER_TECHS.filter(t => reversed.includes(t)));
  });

  it("offers only filters that some project uses", () => {
    const used = usedFilterTechs();
    expect(used.length).toBeGreaterThan(0);
    used.forEach(tech =>
      expect(PROJECTS.some(p => p.stack.some(s => s === tech))).toBe(true)
    );
  });
});
