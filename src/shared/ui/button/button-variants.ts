import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "flex items-center justify-center px-3.5 h-11 desktop:h-9.5 rounded-lg border border-transparent transition-[color,background-color,border-color,outline-color] duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-bg-1 desktop:hover:bg-bg-1-hover",
        default: "bg-bg-2 desktop:hover:bg-bg-2-hover",
        ghost: "bg-transparent border-white desktop:hover:border-white/50"
      },
      concealed: {
        // Only a button that can hide fades; transitioning opacity on every button would fight GSAP entrances.
        true: "pointer-events-none -z-1 invisible opacity-0 transition-[color,background-color,border-color,outline-color,opacity,visibility]",
        false:
          "transition-[color,background-color,border-color,outline-color,opacity,visibility]"
      }
    },
    defaultVariants: { variant: "default" }
  }
);

export const buttonTextVariants = cva("text-sm leading-4.5", {
  variants: {
    variant: {
      primary: "text-primary-1",
      default: "text-white",
      ghost: "text-white"
    }
  },
  defaultVariants: { variant: "default" }
});
