import { GITHUB_URL } from "@/shared/config";

import type { AboutType } from "./about-types";

/** Where a snippet's file path points: the public repository of this site. */
export const SNIPPET_BLOB_URL = `${GITHUB_URL}/portfolio/blob/main`;

export const SNIPPET_AUTHOR = "@romanenkosergio";

// Real excerpts from this repository (nothing from client work, D16): every line is verbatim
// from `path`, cuts are `// …` (checked by `yarn snippets`). The explanation of
// each is the `about.snippets.items.<id>.details` message.
export const SNIPPETS = [
  {
    id: "routing",
    path: "src/shared/i18n/routing.ts",
    code: `export const routing = defineRouting({
  locales: ["en", "uk", "ru"],
  defaultLocale: "en",
  localePrefix: "always"
});`
  },
  {
    id: "hasNonEmptyChildren",
    path: "eslint/rules/require-title.mjs",
    code: `const hasNonEmptyChildren = node =>
  (node.children ?? []).some(child => {
    if (child.type === "JSXText") {
      return child.value.trim().length > 0;
    }
    // An expression container holding only a comment renders nothing.
    return child.type !== "JSXEmptyExpression";
  });`
  },
  {
    id: "matchMotion",
    path: "src/shared/lib/motion/reduced-motion.ts",
    code: `export const matchMotion = (
  scope: Element,
  { full, reduced, condition }: IMotionVariants
): gsap.MatchMedia => {
  const mm = gsap.matchMedia(scope);
  // …
  mm.add(query(QUERIES.full), run(full));
  mm.add(query(QUERIES.reduced), run(reduced));
  return mm;
};`
  },
  {
    id: "yearsSince",
    path: "src/shared/lib/years-since/years-since.ts",
    code: `export const yearsSince = (start: Date, now: Date = new Date()): number => {
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    now.getMonth() -
    start.getMonth();
  const full = now.getDate() < start.getDate() ? months - 1 : months;
  return Math.max(0, Math.floor(full / 12));
};`
  },
  {
    id: "closeTab",
    path: "src/pages/about/model/tabs.ts",
    code: `export const closeTab = (
  tabs: readonly AboutType[],
  type: AboutType
): { tabs: AboutType[]; next: AboutType | undefined } => {
  const index = tabs.indexOf(type);
  const rest = tabs.filter(tab => tab !== type);
  return { tabs: rest, next: rest[Math.min(index, rest.length - 1)] };
};`
  },
  {
    id: "closeTabTest",
    path: "src/pages/about/model/tabs.test.ts",
    code: `it("closes a tab and shows the right neighbour", () => {
  expect(closeTab(["bio", "skills", "games"], "skills")).toEqual({
    tabs: ["bio", "games"],
    next: "games"
  });
});`
  },
  {
    id: "step",
    path: "src/pages/home/model/snake.ts",
    code: `export const step = (state: SnakeState, random: RandomSource): SnakeState => {
  const [dx, dy] = VECTORS[state.direction];
  const head: Cell = [state.snake[0][0] + dx, state.snake[0][1] + dy];
  // …
  if (sameCell(head, state.food)) {
    return {
      ...state,
      snake: [head, ...state.snake],
      food: placeFood(random),
      // …
    };
  }
};`
  },
  {
    id: "keyToDirection",
    path: "src/pages/home/lib/key-to-direction.ts",
    code: `export const keyToDirection = (
  event: Pick<KeyboardEvent, "key" | "metaKey" | "ctrlKey" | "altKey">
): Direction | undefined => {
  if (event.metaKey || event.ctrlKey || event.altKey) return undefined;
  return KEY_DIRECTIONS[event.key] ?? KEY_DIRECTIONS[event.key.toLowerCase()];
};`
  }
] as const;

export type SnippetId = (typeof SNIPPETS)[number]["id"];

/** The excerpts each file of About shows beside it, in order (`about.snippets.items.<id>`). */
export const SNIPPETS_BY_TYPE = {
  bio: ["routing"],
  interests: ["hasNonEmptyChildren"],
  skills: ["matchMotion"],
  experience: ["yearsSince"],
  games: ["step", "keyToDirection"],
  learning: ["closeTab", "closeTabTest"]
} as const satisfies Record<AboutType, readonly SnippetId[]>;
