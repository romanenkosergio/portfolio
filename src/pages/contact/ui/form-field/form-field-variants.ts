import { cva } from "class-variance-authority";

export const controlVariants = cva(
  "w-full rounded-lg border bg-primary-6 px-3.5 text-base text-white transition-colors duration-300 placeholder:text-secondary-1 focus-visible:border-accent-1 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-accent-1",
  {
    variants: {
      invalid: {
        true: "border-accent-3",
        false: "border-secondary-1 hover:border-light"
      }
    },
    defaultVariants: { invalid: false }
  }
);
