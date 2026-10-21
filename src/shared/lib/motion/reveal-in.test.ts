import gsap from "gsap";

import { revealIn } from "./reveal-in";
import { PENDING_ATTR } from "./tokens";

jest.mock("gsap", () => ({
  __esModule: true,
  default: { from: jest.fn(() => ({ play: jest.fn() })) }
}));

const pendingHost = (): HTMLElement => {
  const host = document.createElement("div");
  host.setAttribute(PENDING_ATTR, "");
  host.style.opacity = "0";
  return host;
};

describe("revealIn", () => {
  beforeEach(() => jest.clearAllMocks());

  it("fades and lifts a pending host, then hands it over", () => {
    const host = pendingHost();
    revealIn(host, host, false, {});
    expect(gsap.from).toHaveBeenCalledWith(
      host,
      expect.objectContaining({ opacity: 0 })
    );
    expect(host.hasAttribute(PENDING_ATTR)).toBe(false);
  });

  it("eager only lifts: the opacity is never touched", () => {
    const host = document.createElement("div");
    revealIn(host, host, false, { eager: true });
    const vars = (gsap.from as jest.Mock).mock.calls[0][1];
    expect(vars).toEqual(expect.objectContaining({ y: expect.any(Number) }));
    expect(vars).not.toHaveProperty("opacity");
  });

  it("eager with reduced motion does not animate", () => {
    revealIn(document.createElement("div"), document.body, true, {
      eager: true
    });
    expect(gsap.from).not.toHaveBeenCalled();
  });
});
