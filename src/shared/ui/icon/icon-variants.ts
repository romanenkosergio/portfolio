import { cva } from "class-variance-authority";

export const iconVariants = cva("inline-block select-none", {
  variants: {
    // Resting colour; "inherit" leaves it to the parent.
    tone: {
      inherit: "",
      muted: "text-secondary-1",
      light: "text-white",
      dark: "text-primary-6"
    },
    // Colour while the surrounding `group` is hovered.
    hover: {
      none: "",
      light: "group-hover:text-white",
      lightOnDesktop: "desktop:group-hover:text-white"
    },
    motion: {
      none: "",
      smooth: "transition-all duration-300 ease-in-out",
      colors: "transition-colors duration-300 ease-in"
    },
    faded: { true: "opacity-30", false: "" }
  },
  defaultVariants: {
    tone: "inherit",
    hover: "none",
    motion: "none",
    faded: false
  }
});
