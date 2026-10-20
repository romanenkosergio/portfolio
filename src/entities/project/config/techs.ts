import type { IconName } from "@/shared/ui";

interface ITechInfo {
  // Brand name; not translated.
  label: string;
  icon: IconName;
  // Colours of the badge on a card: a palette surface and the icon on it.
  badge: string;
}

// Every technology a project can list. Several share one icon (Liquid → Shopify, Vuex → Vue …);
// a card draws one badge per icon.
export const TECHS = {
  "react": { label: "React", icon: "tech/react", badge: "bg-accent-6" },
  "typescript": {
    label: "TypeScript",
    icon: "tech/typescript",
    badge: "bg-secondary-3 text-white"
  },
  "nextjs": { label: "Next.js", icon: "tech/nextjs", badge: "bg-light" },
  "vue": { label: "Vue", icon: "tech/vue", badge: "bg-accent-2" },
  "django": { label: "Django", icon: "tech/django", badge: "bg-secondary-2" },
  "react-native": {
    label: "React Native",
    icon: "tech/react",
    badge: "bg-accent-6"
  },
  "nestjs": { label: "NestJS", icon: "tech/nestjs", badge: "bg-accent-3" },
  "godot": { label: "Godot", icon: "tech/godot", badge: "bg-accent-4" },
  "gdscript": { label: "GDScript", icon: "tech/godot", badge: "bg-accent-4" },
  "shopify": { label: "Shopify", icon: "tech/shopify", badge: "bg-accent-2" },
  "liquid": { label: "Liquid", icon: "tech/shopify", badge: "bg-accent-2" },
  "javascript": {
    label: "JavaScript",
    icon: "tech/javascript",
    badge: "bg-accent-1"
  },
  "telegram": {
    label: "Telegram Bot API",
    icon: "tech/telegram",
    badge: "bg-accent-6"
  },
  "sass": { label: "Sass", icon: "tech/sass", badge: "bg-accent-3" },
  "gulp": { label: "Gulp", icon: "tech/gulp", badge: "bg-secondary-4" },
  "webpack": { label: "Webpack", icon: "tech/webpack", badge: "bg-accent-6" },
  "vuex": { label: "Vuex", icon: "tech/vue", badge: "bg-accent-2" },
  "astro": { label: "Astro", icon: "tech/astro", badge: "bg-accent-1" },
  "expo": { label: "Expo", icon: "tech/expo", badge: "bg-light" }
} as const satisfies Record<string, ITechInfo>;

export type Tech = keyof typeof TECHS;

// The technologies offered as filters, in sidebar order; the rest only show on cards.
export const FILTER_TECHS = [
  "react",
  "typescript",
  "nextjs",
  "vue",
  "django",
  "react-native",
  "nestjs",
  "godot"
] as const satisfies readonly Tech[];
