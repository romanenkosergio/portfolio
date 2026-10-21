import type { TechIconName } from "@/shared/ui/tech-icon";

interface ITechInfo {
  // Brand name; not translated.
  label: string;
  icon: TechIconName;
  // Colours of the badge on a card: a palette surface and the icon on it.
  badge: string;
  // The same colour as a CSS variable, for the card cover.
  accent: string;
}

// Every technology a project can list. Several share one icon (Liquid → Shopify, Vuex → Vue …);
// a card draws one badge per icon.
export const TECHS = {
  "react": {
    label: "React",
    icon: "react",
    badge: "bg-accent-6",
    accent: "var(--color-accent-6)"
  },
  "typescript": {
    label: "TypeScript",
    icon: "typescript",
    badge: "bg-secondary-3 text-white",
    accent: "var(--color-secondary-3)"
  },
  "nextjs": {
    label: "Next.js",
    icon: "nextjs",
    badge: "bg-light",
    accent: "var(--color-light)"
  },
  "vue": {
    label: "Vue",
    icon: "vue",
    badge: "bg-accent-2",
    accent: "var(--color-accent-2)"
  },
  "django": {
    label: "Django",
    icon: "django",
    badge: "bg-secondary-2",
    accent: "var(--color-secondary-2)"
  },
  "react-native": {
    label: "React Native",
    icon: "react",
    badge: "bg-accent-6",
    accent: "var(--color-accent-6)"
  },
  "nestjs": {
    label: "NestJS",
    icon: "nestjs",
    badge: "bg-accent-3",
    accent: "var(--color-accent-3)"
  },
  "godot": {
    label: "Godot",
    icon: "godot",
    badge: "bg-accent-4",
    accent: "var(--color-accent-4)"
  },
  "gdscript": {
    label: "GDScript",
    icon: "godot",
    badge: "bg-accent-4",
    accent: "var(--color-accent-4)"
  },
  "shopify": {
    label: "Shopify",
    icon: "shopify",
    badge: "bg-accent-2",
    accent: "var(--color-accent-2)"
  },
  "liquid": {
    label: "Liquid",
    icon: "shopify",
    badge: "bg-accent-2",
    accent: "var(--color-accent-2)"
  },
  "javascript": {
    label: "JavaScript",
    icon: "javascript",
    badge: "bg-accent-1",
    accent: "var(--color-accent-1)"
  },
  "telegram": {
    label: "Telegram Bot API",
    icon: "telegram",
    badge: "bg-accent-6",
    accent: "var(--color-accent-6)"
  },
  "sass": {
    label: "Sass",
    icon: "sass",
    badge: "bg-accent-3",
    accent: "var(--color-accent-3)"
  },
  "gulp": {
    label: "Gulp",
    icon: "gulp",
    badge: "bg-secondary-4",
    accent: "var(--color-secondary-4)"
  },
  "webpack": {
    label: "Webpack",
    icon: "webpack",
    badge: "bg-accent-6",
    accent: "var(--color-accent-6)"
  },
  "vuex": {
    label: "Vuex",
    icon: "vue",
    badge: "bg-accent-2",
    accent: "var(--color-accent-2)"
  },
  "astro": {
    label: "Astro",
    icon: "astro",
    badge: "bg-accent-1",
    accent: "var(--color-accent-1)"
  },
  "expo": {
    label: "Expo",
    icon: "expo",
    badge: "bg-light",
    accent: "var(--color-light)"
  }
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
