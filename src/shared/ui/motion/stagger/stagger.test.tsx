import { renderToString } from "react-dom/server";

import { PENDING_ATTR } from "@/shared/lib/motion";

import Stagger from "./stagger";

describe("Stagger markup", () => {
  it("hides its content until GSAP owns it", () => {
    expect(renderToString(<Stagger>a</Stagger>)).toContain(PENDING_ATTR);
  });

  it("paints eager content visible in the server markup", () => {
    expect(renderToString(<Stagger eager>a</Stagger>)).not.toContain(
      PENDING_ATTR
    );
  });
});
