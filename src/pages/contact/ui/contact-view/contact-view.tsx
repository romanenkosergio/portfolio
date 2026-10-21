import type { FC } from "react";

import { useTranslations } from "next-intl";

import { ContactSidebar, ContentLayout } from "@/widgets/content-layout";

import { CodePreview } from "../code-preview";
import { ContactForm } from "../contact-form";

// The sidebar (contacts; below `desktop` the same links sit above the form), the form, and on desktop the live code preview beside it.
const ContactView: FC = () => {
  const t = useTranslations("contact");

  return (
    <ContentLayout type="contact">
      <section className="flex min-w-0 flex-1 flex-col desktop:min-h-0 desktop:flex-row desktop:overflow-hidden">
        <h1 className="sr-only">{t("heading")}</h1>
        <ContactSidebar className="h-auto flex-none border-b border-b-line desktop:hidden" />
        <div className="flex-none scrollbar-pane px-5.5 py-6 desktop:min-h-0 desktop:flex-1 desktop:overflow-y-auto desktop:border-r desktop:border-r-line desktop:px-10 desktop:py-12">
          <ContactForm />
        </div>
        <div className="hidden scrollbar-pane desktop:block desktop:min-h-0 desktop:w-[45%] desktop:max-w-187.5 desktop:overflow-y-auto">
          <CodePreview />
        </div>
      </section>
    </ContentLayout>
  );
};

export default ContactView;
