import type { IProject } from "../model/project.types";

// Commercial work is NDA-safe (D16): generic domain, no names, links or numbers. The copy of each
// slug is `projects.items.<slug>` in messages. Personal projects (D17) link only what is public (D20).
export const PROJECTS = [
  {
    slug: "saas-platform",
    kind: "commercial",
    cover: { tech: "react", pattern: 0 },
    stack: ["react", "nextjs", "typescript"]
  },
  {
    slug: "early-stage-products",
    kind: "commercial",
    cover: { tech: "nextjs", pattern: 1 },
    stack: ["react", "nextjs", "typescript"]
  },
  {
    slug: "data-heavy-ui",
    kind: "commercial",
    cover: { tech: "typescript", pattern: 2 },
    stack: ["react", "typescript"]
  },
  {
    slug: "ecommerce-platform",
    kind: "commercial",
    cover: { tech: "shopify", pattern: 3 },
    stack: ["react", "shopify", "liquid", "django"]
  },
  {
    slug: "client-apps",
    kind: "commercial",
    cover: { tech: "django", pattern: 0 },
    stack: ["react", "vue", "django"]
  },
  {
    slug: "lead-automation",
    kind: "commercial",
    cover: { tech: "telegram", pattern: 1 },
    stack: ["javascript", "telegram", "sass", "gulp"]
  },
  {
    slug: "marketing-sites",
    kind: "commercial",
    cover: { tech: "sass", pattern: 2 },
    stack: ["vue", "vuex", "sass", "webpack"]
  },
  {
    slug: "tiny-coop",
    kind: "personal",
    cover: { tech: "godot", pattern: 3 },
    stack: ["godot", "gdscript"]
  },
  {
    slug: "dareboard",
    kind: "personal",
    cover: { tech: "astro", pattern: 0 },
    stack: ["react-native", "expo", "nestjs", "typescript", "astro"],
    href: "https://dareboard.app",
    featured: true
  }
] as const satisfies readonly IProject[];
