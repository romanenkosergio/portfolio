import { cva } from "class-variance-authority";

export const navLinkVariants = cva(
  "text-white desktop:border-b-3 desktop:border-b-transparent desktop:text-secondary-1 max-desktop:aria-[current]:text-accent-1",
  {
    variants: {
      variant: {
        header: "desktop:aria-[current]:text-white",
        // Icon rail of the explorer: dim until current or hovered.
        rail: "gap-2 desktop:text-secondary-1/40 desktop:hover:text-secondary-1",
        // A row of the explorer tree.
        file: "gap-3 py-1"
      }
    },
    defaultVariants: { variant: "header" }
  }
);

// Colour of the current page on desktop; a link may bring its own (`activeClass`).
export const navLinkActiveClass = {
  header: "desktop:aria-[current]:border-b-accent-1",
  rail: "desktop:aria-[current]:text-white",
  file: "desktop:aria-[current]:text-white"
} as const;
