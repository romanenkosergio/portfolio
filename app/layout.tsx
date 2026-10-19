import type { FC, PropsWithChildren } from "react";

import type { Metadata, Viewport } from "next";

import { APP_CONFIG } from "@/shared/config";

import { fonts } from "@/app/config";
import { generateIcons } from "@/app/lib";
import { ContentProvider } from "@/app/providers";
import "@/app/styles";

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL(APP_CONFIG.BASE_URL),
    title: "Romanenko Serii",
    description:
      "Discover my professional portfolio, projects, and contact information.\n",
    openGraph: {
      title: "Welcome to My Portfolio",
      description: "Explore my projects, learn about me, and get in touch.\n",
      url: "/",
      type: "website",
      images: "/assets/images/meta-picture.png"
    },
    alternates: {
      canonical: "/"
    },
    icons: generateIcons()
  };
}

export const viewport: Viewport = {
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false
};

const Layout: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <html className={fonts}>
      <head />
      <body>
        <ContentProvider>{children}</ContentProvider>
      </body>
    </html>
  );
};

export default Layout;
