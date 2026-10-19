import type { FC, PropsWithChildren } from "react";

import type { Metadata } from "next";
import type { AbstractIntlMessages } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { APP_CONFIG, OPEN_GRAPH } from "@/shared/config";
import { LOCALES, OG_LOCALES } from "@/shared/i18n";

import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { LayoutShell } from "@/widgets/layout-shell";

import { fonts } from "@/app/config";
import { generateIcons, resolveLocale } from "@/app/lib";
import type { ILocaleProps } from "@/app/model";
import "@/app/styles";

// The namespaces client components read (header/burger/switcher, the game); the rest stays on the server.
const CLIENT_NAMESPACES = ["header", "languageSwitcher", "game"] as const;

const pickMessages = (messages: AbstractIntlMessages) =>
  Object.fromEntries(
    CLIENT_NAMESPACES.map(namespace => [namespace, messages[namespace]])
  );

// Only the listed locales exist; anything else falls through to the global 404.
export const dynamicParams = false;

export const generateStaticParams = () => LOCALES.map(locale => ({ locale }));

export async function generateMetadata({
  params
}: ILocaleProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(APP_CONFIG.BASE_URL),
    title: { default: t("appName"), template: `%s | ${t("appName")}` },
    description: t("appDescription"),
    openGraph: {
      ...OPEN_GRAPH,
      title: t("ogTitle"),
      description: t("ogDescription"),
      locale: OG_LOCALES[locale]
    },
    icons: generateIcons()
  };
}

const Layout: FC<PropsWithChildren<ILocaleProps>> = async ({
  children,
  params
}) => {
  const locale = await resolveLocale(params);
  const messages = await getMessages({ locale });
  return (
    <html lang={locale} className={fonts}>
      <head />
      <body>
        <NextIntlClientProvider messages={pickMessages(messages)}>
          <LayoutShell header={<Header />} footer={<Footer />}>
            {children}
          </LayoutShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default Layout;
