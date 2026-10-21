import { useTranslations } from "next-intl";

import { CodeBlock } from "@/shared/ui/code-block";

import {
  SNIPPETS,
  SNIPPETS_BY_TYPE,
  SNIPPET_AUTHOR,
  SNIPPET_BLOB_URL
} from "@/pages/about/config";
import { byType } from "@/pages/about/lib";

import { SnippetCard } from "../snippet-card";
import { SnippetPanels } from "../snippet-panels";

const SnippetShowcase = () => {
  const t = useTranslations("about.snippets");

  const panels = byType(type =>
    SNIPPETS_BY_TYPE[type].map(id => {
      const snippet = SNIPPETS.find(item => item.id === id);
      return (
        snippet && (
          <SnippetCard
            key={id}
            author={SNIPPET_AUTHOR}
            path={snippet.path}
            url={`${SNIPPET_BLOB_URL}/${snippet.path}`}
            details={t(`items.${id}.details`)}
            detailsLabel={t("details")}
            closeLabel={t("close")}
          >
            <CodeBlock code={snippet.code} />
          </SnippetCard>
        )
      );
    })
  );

  return (
    <section className="flex flex-col gap-6 px-7.5 py-6">
      <h2 className="text-lg font-normal text-secondary-1">{t("title")}</h2>
      <SnippetPanels panels={panels} />
    </section>
  );
};

export default SnippetShowcase;
