/**
 * Rules that still fail on existing code, switched off for the specific files
 * only (D5). Each entry names the PLAN item that removes it together with the
 * code it covers; when that item lands, its entries are deleted and the rules
 * apply. No call-site disables. Last in the composition, so these win.
 */

const off = rules => Object.fromEntries(rules.map(rule => [rule, "off"]));
export const pendingConfigs = [
  // PLAN 1.11 — next-intl copy moves to messages/, jsx-no-literals goes live
  {
    files: [
      "app/about-me/hobbies/page.tsx",
      "src/pages/home/ui/snake-game/food.tsx",
      "src/pages/home/ui/snake-game/game.tsx",
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
      "src/pages/home/ui/snake-game/game-overlay.tsx",
      "src/pages/home/ui/snake-game/game.tsx",
      "src/pages/home/ui/snake-game/win-button.tsx"
    ],
    rules: off(["project/no-literal-copy"])
  },
  // PLAN 1.16 — Icon/NavLink/Button get variants for these treatments, shadcn/no-restyle goes live
  {
    files: [
      "src/pages/home/ui/snake-game/food.tsx",
      "src/pages/home/ui/snake-game/game-overlay.tsx",
      "src/pages/home/ui/snake-game/keyboard-arrow.tsx",
      "src/widgets/content-layout/ui/sidebar/content-link/content-link.tsx",
      "src/widgets/footer/ui/footer.tsx"
    ],
    rules: off(["shadcn/no-restyle"])
  }
];
