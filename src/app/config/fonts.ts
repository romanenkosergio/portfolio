import { Fira_Code } from "next/font/google";

import { twMerge } from "tailwind-merge";

// Define the fonts here
const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"]
});

export const fonts = twMerge(firaCode.variable, "font-fira-code");
