const isFeatured = (item: object): number =>
  "featured" in item && item.featured === true ? 1 : 0;

// The order cards are shown in: a featured card spans a full row, so it goes first and leaves no
// hole at any column count (the stable sort keeps the rest in list order).
export const featuredFirst = <T extends object>(items: readonly T[]): T[] =>
  [...items].sort((a, b) => isFeatured(b) - isFeatured(a));
