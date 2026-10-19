import { cva } from "class-variance-authority";

export const navLinkVariants = cva(
  "text-white desktop:border-b-3 desktop:border-b-transparent desktop:text-secondary-1 max-desktop:aria-[current]:text-accent-1",
  {
    variants: {
      variant: {
        header: "desktop:aria-[current]:text-white",
        sidebar: "gap-2"
      }
    },
    defaultVariants: { variant: "header" }
  }
);

// Colour of the current page on desktop; a link may bring its own (`activeClass`).
export const navLinkActiveClass = {
  header: "desktop:aria-[current]:border-b-accent-1",
  sidebar: "desktop:aria-[current]:text-accent-2"
} as const;
