/**
 * Rules that still fail on existing code, switched off for the specific files
 * only (D5). Each entry names the PLAN item that removes it together with the
 * code it covers; when that item lands, its entries are deleted and the rules
 * apply. No call-site disables. Last in the composition, so these win.
 */

const off = rules => Object.fromEntries(rules.map(rule => [rule, "off"]));
export const pendingConfigs = [
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
