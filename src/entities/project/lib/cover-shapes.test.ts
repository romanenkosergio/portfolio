import { coverOf } from "./cover-shapes";

describe("coverOf", () => {
  it("draws the same shapes for the same slug", () => {
    expect(coverOf("saas-platform")).toEqual(coverOf("saas-platform"));
    expect(coverOf("saas-platform")).not.toEqual(coverOf("other"));
  });

  it("keeps every number to one decimal", () => {
    const { glows, lines } = coverOf("saas-platform");
    const numbers = [...glows, ...lines].flatMap(shape =>
      Object.values(shape).filter(value => typeof value === "number")
    );
    expect(numbers).toHaveLength(3 * 3 + 9 * 4);
    numbers.forEach(value =>
      expect(value * 10).toBeCloseTo(Math.round(value * 10))
    );
  });
});
