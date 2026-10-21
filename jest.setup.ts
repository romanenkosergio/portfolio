import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// next-intl's navigation helpers sit on the App Router hooks, which need a mounted router.
jest.mock("next/navigation", () => ({
  usePathname: () => "/en",
  useParams: () => ({ locale: "en" }),
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({
    push: () => undefined,
    replace: () => undefined,
    prefetch: () => undefined,
    back: () => undefined,
    forward: () => undefined,
    refresh: () => undefined
  })
}));

// GSAP runs for real, on the reduced-motion branch: every animation settles at its end state at once.
beforeEach(() => {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: query.includes("prefers-reduced-motion: reduce"),
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false
    }) as MediaQueryList;
});

// jsdom has no layout: the typing caret asks a Range for its rects.
Range.prototype.getClientRects = () =>
  ({
    length: 0,
    item: () => null,
    [Symbol.iterator]: [][Symbol.iterator]
  }) as unknown as DOMRectList;
Range.prototype.getBoundingClientRect = () => new DOMRect();
