import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "flex items-center justify-center px-3.5 h-9.5 rounded-lg border border-transparent",
  {
    variants: {
      variant: {
        primary: "bg-bg-1 desktop:hover:bg-bg-1-hover",
        default: "bg-bg-2 desktop:hover:bg-bg-2-hover",
        ghost: "bg-transparent border-white desktop:hover:border-white/50"
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
