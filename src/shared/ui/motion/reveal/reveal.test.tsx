import { renderToString } from "react-dom/server";

import { PENDING_ATTR } from "@/shared/lib/motion";

import Reveal from "./reveal";

describe("Reveal markup", () => {
  it("hides its content until GSAP owns it", () => {
    expect(renderToString(<Reveal>a</Reveal>)).toContain(PENDING_ATTR);
  });

  it("paints eager content visible in the server markup", () => {
    expect(renderToString(<Reveal eager>a</Reveal>)).not.toContain(
      PENDING_ATTR
    );
  });
});
