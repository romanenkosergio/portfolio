import { polyfillPath } from "./polyfill-path.mjs";

describe("polyfillPath", () => {
  it("finds the noModule script", () => {
    const html =
      '<script src="/_next/static/a.js" async></script>' +
      '<script src="/_next/static/chunks/poly.js" noModule=""></script>';
    expect(polyfillPath(html)).toBe("_next/static/chunks/poly.js");
  });

  it("drops the deploy base path", () => {
    const html =
      '<script noModule="" src="/portfolio/_next/static/chunks/poly.js"></script>';
    expect(polyfillPath(html)).toBe("_next/static/chunks/poly.js");
  });

  it("ignores ordinary scripts", () => {
    expect(
      polyfillPath('<script src="/_next/static/a.js" async></script>')
    ).toBeUndefined();
  });
});
