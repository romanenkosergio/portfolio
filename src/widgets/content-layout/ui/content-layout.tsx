import { FC, PropsWithChildren } from "react";
import { IContentLayoutProps } from "./content-layout.types";
import { Sidebar } from "./sidebar";

const ContentLayout: FC<PropsWithChildren<IContentLayoutProps>> = ({
  type,
  subType,
  children
}) => {
  return (
    <section className="flex h-full w-full">
      <Sidebar type={type} subType={subType} />
      {children}
    </section>
  );
};

export default ContentLayout;
