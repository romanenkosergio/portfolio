import { swipeDirection } from "./swipe-direction";

describe("swipeDirection", () => {
  it.each([
    [40, 5, "RIGHT"],
    [-40, -5, "LEFT"],
    [5, 40, "DOWN"],
    [-5, -40, "UP"]
  ])("maps (%d, %d) to %s on the dominant axis", (dx, dy, expected) => {
    expect(swipeDirection(dx, dy)).toBe(expected);
  });

  it("ignores a drag under the threshold", () => {
    expect(swipeDirection(23, -20)).toBeUndefined();
  });

  it("accepts a drag exactly at the threshold", () => {
    expect(swipeDirection(0, -24)).toBe("UP");
  });
});
