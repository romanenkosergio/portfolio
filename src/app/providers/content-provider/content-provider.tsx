import React, { FC, PropsWithChildren } from "react";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

const ContentProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex h-[calc(100dvh-90px)] flex-col">{children}</main>
      <Footer />
    </>
  );
};
export default ContentProvider;
