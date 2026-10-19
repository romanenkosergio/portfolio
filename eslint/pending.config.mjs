/**
 * Rules that still fail on existing code, switched off for the specific files
 * only (D5). Each entry names the PLAN item that removes it together with the
 * code it covers; when that item lands, its entries are deleted and the rules
 * apply. No call-site disables. Last in the composition, so these win.
 */

const off = rules => Object.fromEntries(rules.map(rule => [rule, "off"]));
export const pendingConfigs = [
  // PLAN 1.10 — home/snake: pure snake model, store selectors, React Compiler, focusable game
  {
    files: ["src/pages/home/lib/use-game.ts"],
    rules: off([
      "max-lines-per-function",
      "no-console",
      "react-hooks/exhaustive-deps",
      "react-hooks/immutability"
    ])
  },
  // PLAN 1.10 — home/snake: pure snake model, store selectors, React Compiler, focusable game
  {
    files: ["src/pages/home/model/snake.ts"],
    rules: off([
      "@typescript-eslint/no-unused-vars",
      "project/directive-placement"
    ])
  },
  // PLAN 1.10 — home/snake: pure snake model, store selectors, React Compiler, focusable game
  {
    files: [
      "src/pages/home/ui/snake-game/food.tsx",
      "src/pages/home/ui/snake-game/keyboard-arrow.tsx",
      "src/pages/home/ui/snake-game/keyboard-arrow.types.ts"
    ],
    rules: off(["no-restricted-imports"])
  },
  // PLAN 1.10 — home/snake: pure snake model, store selectors, React Compiler, focusable game
  {
    files: ["src/pages/home/ui/snake-game/game.tsx"],
    rules: off([
      "jsx-a11y/no-static-element-interactions",
      "no-restricted-imports"
    ])
  },
  // PLAN 1.11 — next-intl copy moves to messages/, jsx-no-literals goes live
  {
    files: [
      "app/about-me/hobbies/page.tsx",
      "src/pages/home/ui/snake-game/food.tsx",
      "src/pages/not-found/ui/not-found.tsx",
      "src/widgets/footer/ui/footer.tsx"
    ],
    rules: off(["react/jsx-no-literals"])
  },
  // PLAN 1.11 — next-intl copy moves to messages/, jsx-no-literals goes live
  {
    files: [
      "src/pages/home/ui/home.tsx",
      "src/pages/home/ui/snake-game/snake-game.tsx",
      "src/widgets/header/ui/header.tsx",
      "src/widgets/layout-shell/ui/layout-shell.tsx"
    ],
    rules: off(["project/no-literal-copy", "react/jsx-no-literals"])
  },
  // PLAN 1.11 — next-intl copy moves to messages/, jsx-no-literals goes live
  {
    files: [
      "src/pages/home/ui/snake-game/game.tsx",
      "src/pages/home/ui/snake-game/win-button.tsx"
    ],
    rules: off(["project/no-literal-copy"])
  }
];
