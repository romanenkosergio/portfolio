import React, { FC, useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import RootLayout from 'layouts/RootLayout';

import { About, Contact, Home, Projects } from 'pages';

import { useContentfulStore } from 'store/index';
import { ROUTES } from 'utils/enums';

const App: FC = () => {
  const { fetchContentfulData } = useContentfulStore(state => state);

  useEffect(() => {
    fetchContentfulData();
  }, [fetchContentfulData]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={ROUTES.HOME} element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.PROJECTS} element={<Projects />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
