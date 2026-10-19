import { GITHUB_URL } from "@/shared/config";
import type { IconName } from "@/shared/ui";

type SocialKey = "linkedin" | "twitter" | "medium" | "github";

interface ISocial {
  titleKey: SocialKey;
  href: string;
  icon: IconName;
  label?: string;
}

export const SOCIALS: ISocial[] = [
  {
    titleKey: "linkedin",
    href: "https://www.linkedin.com/in/romanenkosergio/",
    icon: "footer/linkedin"
  },

  {
    titleKey: "twitter",
    href: "https://x.com/romanenkosergio",
    icon: "footer/twitter"
  },
  {
    titleKey: "medium",
    href: "https://medium.com/@romanenkosergio",
    icon: "footer/medium"
  },
  {
    titleKey: "github",
    href: GITHUB_URL,
    icon: "footer/github",
    label: "@romanenkosergio"
  }
];
