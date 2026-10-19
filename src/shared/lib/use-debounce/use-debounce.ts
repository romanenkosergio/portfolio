"use client";

import { useEffect, useState } from "react";

export function useDebounce<T>(
  value: T,
  delay: number,
  callback?: (value: T) => void
): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      if (callback) callback(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay, callback]);

  return debouncedValue;
}
