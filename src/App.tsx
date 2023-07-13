import React, { FC } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { About, Contact, Home, Projects } from "pages";
import RootLayout from "layouts/RootLayout";

import { ROUTES } from "utils/enums";

const App: FC = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={ROUTES.HOME} element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path={ROUTES.ABOUT} element={<About/>}/>
        <Route path={ROUTES.PROJECTS} element={<Projects/>}/>
        <Route path={ROUTES.CONTACT} element={<Contact/>}/>
      </Route>
    ));

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
