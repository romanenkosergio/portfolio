import type * as RequestPath from "./request-path";
import { localeOfPath, requestedPath } from "./request-path";

describe("requestedPath", () => {
  it("returns the path as typed", () => {
    expect(requestedPath("/en/nope/")).toBe("/en/nope/");
  });

  it("shows / for an empty path", () => {
    expect(requestedPath("")).toBe("/");
  });

  it("reads percent-escapes back to text", () => {
    expect(requestedPath("/uk/%D0%BF%D1%80%D0%B8%D0%B2%D1%96%D1%82")).toBe(
      "/uk/привіт"
    );
  });

  it("keeps a malformed escape as typed", () => {
    expect(requestedPath("/en/%E0%A4%A")).toBe("/en/%E0%A4%A");
  });

  it("cuts a long path at 80 characters", () => {
    const shown = requestedPath(`/${"a".repeat(200)}`);
    expect(shown).toBe(`/${"a".repeat(79)}…`);
  });
});

describe("requestedPath with a base path", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("@/shared/config", () => ({ BASE_PATH: "/portfolio" }));
  });
  afterEach(() => jest.dontMock("@/shared/config"));

  const load = () => jest.requireActual<typeof RequestPath>("./request-path");

  it("drops the base path, exact or followed by a slash", () => {
    const { requestedPath: path } = load();
    expect(path("/portfolio")).toBe("/");
    expect(path("/portfolio/")).toBe("/");
    expect(path("/portfolio/en/x")).toBe("/en/x");
  });

  it("does not mistake a longer first segment for the base path", () => {
    const { requestedPath: path } = load();
    expect(path("/portfolios/x")).toBe("/portfolios/x");
  });
});

describe("localeOfPath", () => {
  it("takes the locale of the first segment", () => {
    expect(localeOfPath("/uk/nope")).toBe("uk");
    expect(localeOfPath("/ru")).toBe("ru");
  });

  it("falls back to the default locale", () => {
    expect(localeOfPath("/nope")).toBe("en");
    expect(localeOfPath("/")).toBe("en");
  });
});
