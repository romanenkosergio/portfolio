import type { FC, PropsWithChildren } from "react";

import type { ILayoutShellProps } from "./layout-shell.types";

const LayoutShell: FC<PropsWithChildren<ILayoutShellProps>> = ({
  header,
  footer,
  children
}) => {
  return (
    <>
      <a
        href="#main"
        title="Skip to content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-20 focus:bg-primary-2 focus:p-3 focus:text-white"
      >
        Skip to content
      </a>
      {header}
      <main
        id="main"
        tabIndex={-1}
        className="flex h-[calc(100dvh-90px)] flex-col"
      >
        {children}
      </main>
      {footer}
    </>
  );
};

export default LayoutShell;
