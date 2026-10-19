interface ISocial {
  title: string;
  href: string;
  icon: string;
  label?: string;
}

export const SOCIALS: ISocial[] = [
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/romanenkosergio/",
    icon: "linkedin"
  },

  {
    title: "Twitter",
    href: "https://x.com/romanenkosergio",
    icon: "twitter"
  },
  {
    title: "Medium",
    href: "https://medium.com/@romanenkosergio",
    icon: "medium"
  },
  {
    title: "GitHub",
    href: "https://github.com/romanenkosergio",
    icon: "github",
    label: "@romanenkosergio"
  }
];
