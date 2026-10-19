import type { FC, PropsWithChildren } from "react";

import type { Metadata } from "next";

import { APP_CONFIG, OPEN_GRAPH } from "@/shared/config";

import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { LayoutShell } from "@/widgets/layout-shell";

import { fonts } from "@/app/config";
import { generateIcons } from "@/app/lib";
import "@/app/styles";

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL(APP_CONFIG.BASE_URL),
    title: "Romanenko Serii",
    description:
      "Discover my professional portfolio, projects, and contact information.\n",
    openGraph: OPEN_GRAPH,
    icons: generateIcons()
  };
}

const Layout: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <html lang="en" className={fonts}>
      <head />
      <body>
        <LayoutShell header={<Header />} footer={<Footer />}>
          {children}
        </LayoutShell>
      </body>
    </html>
  );
};

export default Layout;
