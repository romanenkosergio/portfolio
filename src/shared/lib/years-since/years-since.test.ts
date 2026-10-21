import { yearsSince } from "./years-since";

describe("yearsSince", () => {
  const start = new Date(2017, 4, 15);

  it("counts full years, month-accurate", () => {
    expect(yearsSince(start, new Date(2024, 4, 15))).toBe(7);
    expect(yearsSince(start, new Date(2024, 4, 14))).toBe(6);
    expect(yearsSince(start, new Date(2024, 3, 30))).toBe(6);
  });

  it("is never negative", () => {
    expect(yearsSince(start, new Date(2010, 0, 1))).toBe(0);
  });

  it("defaults to now", () => {
    expect(yearsSince(new Date())).toBe(0);
  });
});
