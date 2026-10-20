import { useTranslations } from "next-intl";

import { DISTANCE, DURATION } from "@/shared/lib/motion/tokens";
import { CodeBlock } from "@/shared/ui/code-block";
import { Reveal } from "@/shared/ui/motion";

import {
  SNIPPETS,
  SNIPPET_AUTHOR,
  SNIPPET_BLOB_URL
} from "@/pages/about/config";

import { SnippetCard } from "../snippet-card";

const SnippetShowcase = () => {
  const t = useTranslations("about.snippets");

  return (
    <section className="flex flex-col gap-6 px-7.5 py-6">
      <h2 className="text-lg font-normal text-secondary-1">{t("title")}</h2>
      {SNIPPETS.map((snippet, index) => (
        <Reveal
          key={snippet.id}
          y={DISTANCE.small}
          duration={DURATION.fast}
          delay={index * 0.08}
        >
          <SnippetCard
            author={SNIPPET_AUTHOR}
            path={snippet.path}
            url={`${SNIPPET_BLOB_URL}/${snippet.path}`}
            details={t(`items.${snippet.id}.details`)}
            detailsLabel={t("details")}
            closeLabel={t("close")}
          >
            <CodeBlock code={snippet.code} />
          </SnippetCard>
        </Reveal>
      ))}
    </section>
  );
};

export default SnippetShowcase;
