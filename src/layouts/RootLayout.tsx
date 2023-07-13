import { FC } from "react";
import { Outlet } from "react-router-dom";

import { Footer, Header } from "components";

const RootLayout: FC = () => {
  return (
    <div className="root-layout">
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
};

export default RootLayout;

