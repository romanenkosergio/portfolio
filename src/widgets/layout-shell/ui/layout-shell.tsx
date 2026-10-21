import type { FC, PropsWithChildren } from "react";

import { useTranslations } from "next-intl";

import type { ILayoutShellProps } from "./layout-shell.types";

const LayoutShell: FC<PropsWithChildren<ILayoutShellProps>> = ({
  header,
  footer,
  children
}) => {
  const t = useTranslations("layout");
  return (
    <>
      <a
        href="#main"
        title={t("skipToContent")}
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-20 focus:bg-primary-2 focus:p-3 focus:text-white"
      >
        {t("skipToContent")}
      </a>
      {header}
      <main
        id="main"
        tabIndex={-1}
        className="flex flex-1 flex-col desktop:h-[calc(100dvh-90px)] desktop:flex-initial"
      >
        {children}
      </main>
      {footer}
    </>
  );
};

export default LayoutShell;
