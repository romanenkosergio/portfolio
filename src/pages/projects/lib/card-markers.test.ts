import { EAGER_CARDS, isEagerCard } from "./card-markers";

describe("isEagerCard", () => {
  it("is by position: only the first EAGER_CARDS", () => {
    const flags = Array.from({ length: EAGER_CARDS + 2 }, (_, i) =>
      isEagerCard(i)
    );
    expect(flags.slice(0, EAGER_CARDS).every(Boolean)).toBe(true);
    expect(flags.slice(EAGER_CARDS).some(Boolean)).toBe(false);
  });
});
