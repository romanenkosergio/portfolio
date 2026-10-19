"use client";
import { useEffect, useState } from "react";

import type { IUseMediaQueryOptions } from "./use-media-query.types";

const IS_SSR = typeof window === "undefined";
const MEDIA_QUERY_CHANGE_EVENT = "change";

const useMediaQuery = (
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true
  }: IUseMediaQueryOptions = {}
): boolean => {
  // Checks if the media query matches
  const checkMediaQuery = (query: string): boolean => {
    if (IS_SSR) return defaultValue;
    return window.matchMedia(query).matches;
  };

  // State to track if the media query matches
  const [matches, setMatches] = useState<boolean>(() =>
    initializeWithValue ? checkMediaQuery(query) : defaultValue
  );

  // Updates the state when the media query changes
  const updateMatches = () => setMatches(checkMediaQuery(query));

  useEffect(() => {
    const matchMedia = window.matchMedia(query);
    updateMatches();

    matchMedia.addEventListener(MEDIA_QUERY_CHANGE_EVENT, updateMatches);
    return () => {
      matchMedia.removeEventListener(MEDIA_QUERY_CHANGE_EVENT, updateMatches);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
