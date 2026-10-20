import type { FC, PropsWithChildren } from "react";

import { ContentLayout } from "@/widgets/content-layout";

import { AboutShell } from "@/pages/about";

import { resolveLocale } from "@/app/lib";
import type { ILocaleProps } from "@/app/model";

// The explorer, tab bar and snippet column stay mounted while the file in `children` changes.
const AboutLayout: FC<PropsWithChildren<ILocaleProps>> = async ({
  children,
  params
}) => {
  await resolveLocale(params);
  return (
    <ContentLayout type="about">
      <AboutShell>{children}</AboutShell>
    </ContentLayout>
  );
};

export default AboutLayout;
