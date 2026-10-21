import type { IProject } from "../model/project.types";

// Commercial work is NDA-safe (D16): generic domain, no names, links or numbers. The copy of each
// slug is `projects.items.<slug>` in messages. Personal projects (D17) link only what is public (D20).
export const PROJECTS = [
  {
    slug: "saas-platform",
    kind: "commercial",
    stack: ["react", "nextjs", "typescript"]
  },
  {
    slug: "early-stage-products",
    kind: "commercial",
    stack: ["react", "nextjs", "typescript"]
  },
  {
    slug: "data-heavy-ui",
    kind: "commercial",
    stack: ["react", "typescript"]
  },
  {
    slug: "ecommerce-platform",
    kind: "commercial",
    stack: ["react", "shopify", "liquid", "django"]
  },
  {
    slug: "client-apps",
    kind: "commercial",
    stack: ["react", "vue", "django"]
  },
  {
    slug: "lead-automation",
    kind: "commercial",
    stack: ["javascript", "telegram", "sass", "gulp"]
  },
  {
    slug: "marketing-sites",
    kind: "commercial",
    stack: ["vue", "vuex", "sass", "webpack"]
  },
  { slug: "tiny-coop", kind: "personal", stack: ["godot", "gdscript"] },
  {
    slug: "dareboard",
    kind: "personal",
    stack: ["react-native", "expo", "nestjs", "typescript", "astro"],
    href: "https://dareboard.app"
  }
] as const satisfies readonly IProject[];
