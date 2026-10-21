import { renderToString } from "react-dom/server";

import { PENDING_ATTR } from "@/shared/lib/motion";

import { LinesReveal } from "../lines-reveal";
import { Stagger } from "../stagger";

import Reveal from "./reveal";

describe("motion primitives markup", () => {
  it("hide their content until GSAP owns it", () => {
    const html = renderToString(
      <>
        <Reveal>a</Reveal>
        <Stagger>b</Stagger>
        <LinesReveal>c</LinesReveal>
      </>
    );
    expect(html.split(PENDING_ATTR)).toHaveLength(4);
  });

  it("paint eager content visible in the server markup", () => {
    const html = renderToString(
      <>
        <Reveal eager>a</Reveal>
        <Stagger eager>b</Stagger>
        <LinesReveal eager>c</LinesReveal>
      </>
    );
    expect(html).not.toContain(PENDING_ATTR);
  });
});
