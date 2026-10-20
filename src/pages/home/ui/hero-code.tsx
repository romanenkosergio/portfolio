import type { FC, ReactNode } from "react";

import { useTranslations } from "next-intl";

import { GITHUB_URL } from "@/shared/config";
import { cn } from "@/shared/lib";
import { Stagger } from "@/shared/ui/motion";

import { HERO_DELAY } from "@/pages/home/config";

const GITHUB_LINK_TEXT = `"${GITHUB_URL}"`;

/** A line of the code block, with its line number in an aria-hidden gutter. */
const CodeLine: FC<{
  number: number;
  children: ReactNode;
  className?: string;
}> = ({ number, children, className }) => (
  <div className={cn("flex gap-4", className)}>
    <span
      aria-hidden="true"
      className="w-4 shrink-0 text-right text-secondary-1 tabular-nums select-none"
    >
      {number}
    </span>
    <p>{children}</p>
  </div>
);

const HeroCode: FC = () => {
  const t = useTranslations("home");
  return (
    <Stagger className="mt-20" delay={HERO_DELAY.code}>
      <CodeLine number={1}>
        <span className="text-md text-secondary-1">{t("hint")}</span>
      </CodeLine>
      <CodeLine number={2} className="mt-2.5">
        <span className="text-secondary-3">{t("constKeyword")}</span>
        <span className="text-accent-2"> {t("linkName")}</span> {t("assign")}{" "}
        <a
          title={t("linkTitle")}
          rel="nofollow noreferrer"
          target="_blank"
          className="relative text-accent-1 underline-offset-4 before:absolute before:bottom-0 before:left-0 before:block before:h-0.25 before:w-full before:origin-left before:scale-x-0 before:bg-accent-1 before:transition-transform before:duration-300 before:ease-in-out before:content-[''] hover:before:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-1 focus-visible:before:scale-x-100"
          href={GITHUB_URL}
        >
          {GITHUB_LINK_TEXT}
        </a>
      </CodeLine>
    </Stagger>
  );
};

export default HeroCode;
