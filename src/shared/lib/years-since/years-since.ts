// Full years between `start` and `now` (floor, month-accurate).
export const yearsSince = (start: Date, now: Date = new Date()): number => {
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    now.getMonth() -
    start.getMonth();
  const full = now.getDate() < start.getDate() ? months - 1 : months;
  return Math.max(0, Math.floor(full / 12));
};
