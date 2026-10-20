import type { IProject } from "../model/project.types";

// Commercial work is NDA-safe (D16): generic domain, no names, links or numbers. The copy of each
// slug is `projects.items.<slug>` in messages. Personal projects (D17) have no public links yet.
export const PROJECTS = [
  {
    slug: "saas-platform",
    kind: "commercial",
    stack: ["react", "nextjs", "typescript"]
  },
  {
    slug: "startup-products",
    kind: "commercial",
    stack: ["react", "nextjs", "typescript"]
  },
  {
    slug: "web3-product-ui",
    kind: "commercial",
    stack: ["react", "typescript"]
  },
  {
    slug: "shopify-marketplace",
    kind: "commercial",
    stack: ["react", "shopify", "liquid", "django"]
  },
  {
    slug: "client-apps",
    kind: "commercial",
    stack: ["react", "vue", "django"]
  },
  {
    slug: "crm-automation",
    kind: "commercial",
    stack: ["javascript", "telegram", "sass", "gulp"]
  },
  {
    slug: "vue-client-sites",
    kind: "commercial",
    stack: ["vue", "vuex", "sass", "webpack"]
  },
  { slug: "tiny-coop", kind: "personal", stack: ["godot", "gdscript"] },
  {
    slug: "dareboard",
    kind: "personal",
    stack: ["react-native", "expo", "nestjs", "typescript", "astro"]
  }
] as const satisfies readonly IProject[];
