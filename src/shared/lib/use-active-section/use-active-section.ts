"use client";

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

const DEFAULT_THRESHOLD = [0, 0.1, 0.9, 1];
const DEFAULT_ROOT_MARGIN = "-50% 0px -45% 0px";

const createIntersectionObserver = <T extends string>(
  setActiveSection: Dispatch<SetStateAction<T>>,
  threshold: number[],
  rootMargin: string
): IntersectionObserver => {
  return new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as T);
        }
      });
    },
    { root: null, rootMargin, threshold }
  );
};

const useActiveSection = <T extends string>(
  sectionIds: T[],
  defaultActiveSection: T,
  threshold: number[] = DEFAULT_THRESHOLD,
  rootMargin: string = DEFAULT_ROOT_MARGIN
) => {
  const [activeSection, setActiveSection] = useState<T>(defaultActiveSection);

  const intersectionObserver = useMemo(
    () => createIntersectionObserver(setActiveSection, threshold, rootMargin),
    [setActiveSection, threshold, rootMargin]
  );

  useEffect(() => {
    sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        intersectionObserver.observe(section);
      }
    });

    return () => {
      intersectionObserver.disconnect();
    };
  }, [sectionIds, intersectionObserver]);

  return activeSection;
};

export default useActiveSection;
