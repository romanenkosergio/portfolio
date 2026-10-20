import { GITHUB_URL } from "@/shared/config";

/** Where a snippet's file path points: the public repository of this site. */
export const SNIPPET_BLOB_URL = `${GITHUB_URL}/portfolio/blob/main`;

export const SNIPPET_AUTHOR = "@romanenkosergio";

// Real excerpts from this repository (nothing from client work, D16). The explanation of
// each is the `about.snippets.items.<id>.details` message.
export const SNIPPETS = [
  {
    id: "step",
    path: "src/pages/home/model/snake.ts",
    code: `export const step = (state: SnakeState, random: RandomSource) => {
  if (state.status !== "playing") return state;

  const [dx, dy] = VECTORS[state.direction];
  const head: Cell = [state.snake[0][0] + dx, state.snake[0][1] + dy];

  if (sameCell(head, state.food)) {
    return { ...state, snake: [head, ...state.snake], food: placeFood(random) };
  }
  return { ...state, snake: [head, ...state.snake.slice(0, -1)] };
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
