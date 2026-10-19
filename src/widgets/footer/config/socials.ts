import type { IconName } from "@/shared/ui";

interface ISocial {
  title: string;
  href: string;
  icon: IconName;
  label?: string;
}

export const SOCIALS: ISocial[] = [
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/romanenkosergio/",
    icon: "footer/linkedin"
  },

  {
    title: "Twitter",
    href: "https://x.com/romanenkosergio",
    icon: "footer/twitter"
  },
  {
    title: "Medium",
    href: "https://medium.com/@romanenkosergio",
    icon: "footer/medium"
  },
  {
    title: "GitHub",
    href: "https://github.com/romanenkosergio",
    icon: "footer/github",
    label: "@romanenkosergio"
  }
];
