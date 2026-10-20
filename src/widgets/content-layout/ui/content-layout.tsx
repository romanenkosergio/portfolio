import type { FC, PropsWithChildren } from "react";

import type { IContentLayoutProps } from "./content-layout.types";
import { Sidebar } from "./sidebar";

const ContentLayout: FC<PropsWithChildren<IContentLayoutProps>> = ({
  type,
  subType,
  children
}) => {
  return (
    <section className="flex h-full min-h-0 w-full min-w-0">
      <Sidebar type={type} subType={subType} />
      {children}
    </section>
  );
};

export default ContentLayout;
