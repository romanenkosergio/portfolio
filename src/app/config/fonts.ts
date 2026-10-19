import { Fira_Code } from "next/font/google";

import { cn } from "@/shared/lib";

// Define the fonts here
const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"]
});

export const fonts = cn(firaCode.variable, "font-fira-code");
