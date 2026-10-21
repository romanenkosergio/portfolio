import { useEffect } from "react";

import { render } from "@testing-library/react";
import gsap from "gsap";
import { renderToString } from "react-dom/server";

import { PENDING_ATTR } from "@/shared/lib/motion";

import LinesReveal from "./lines-reveal";

jest.mock("gsap", () => ({
  __esModule: true,
  default: { from: jest.fn(), registerPlugin: jest.fn() }
}));
jest.mock("@gsap/react", () => ({
  useGSAP: (run: () => void) => useEffect(() => run(), [run])
}));
jest.mock("@/shared/lib/motion/reduced-motion", () => ({
  matchMotion: (_: Element, { full }: { full: () => void }) => {
    full();
    return { revert: jest.fn() };
  }
}));

describe("LinesReveal", () => {
  it("hides its content until GSAP owns it", () => {
    expect(renderToString(<LinesReveal>a</LinesReveal>)).toContain(
      PENDING_ATTR
    );
  });

  it("paints eager content visible in the server markup", () => {
    expect(renderToString(<LinesReveal eager>a</LinesReveal>)).not.toContain(
      PENDING_ATTR
    );
  });

  it("eager rows slide on x only, never fade", () => {
    render(
      <LinesReveal eager>
        <div data-line-text="">a</div>
      </LinesReveal>
    );
    const calls = (gsap.from as jest.Mock).mock.calls;
    expect(calls.length).toBeGreaterThan(0);
    for (const [, vars] of calls) {
      expect(vars).toHaveProperty("x");
      expect(vars).not.toHaveProperty("opacity");
    }
  });
});
