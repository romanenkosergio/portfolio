import { cva } from "class-variance-authority";

export const iconVariants = cva("inline-block select-none", {
  variants: {
    // Role of the icon: follow the parent, rest muted, or sit on an active (light) surface.
    tone: {
      inherit: "",
      muted: "text-secondary-1",
      active: "text-primary-6",
      // Folder colours of the file explorer.
      rose: "text-accent-3",
      mint: "text-accent-2",
      indigo: "text-secondary-3"
    },
    // Turns white while the surrounding `group` is hovered (desktop only, like Button).
    interactive: { true: "desktop:group-hover:text-white", false: "" },
    // Dimmed state, only for icons that pass it; both states carry the opacity transition so the
    // fade runs either way. Not for GSAP-driven icons (leave `faded` unset there).
    faded: {
      true: "opacity-30 transition-[color,opacity] duration-300 ease-in-out",
      false: "opacity-100 transition-[color,opacity] duration-300 ease-in-out"
    }
  },
  defaultVariants: { tone: "inherit", interactive: false }
});
