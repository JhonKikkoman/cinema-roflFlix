import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MOVIE_LIST, TOP_LISTS } from '../constant';
import { listsT } from '../models/constants.types';
import Layout from './Layout';
import ActorDetail from './pages/ActorDetail';
import MoviesDetail from './pages/MoviesDetail';
import MoviesListMain from './pages/MoviesListMain';
import MoviesListTop from './pages/MoviesListTop';
import Movies from './pages/MoviesPages';
import Authentication from './ui/Authentication';
import PageNotFound from './ui/PageNotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Movies />,
      },
      ...TOP_LISTS.map((elem: listsT) => ({
        path: elem.url,
        element: <MoviesListTop />,
      })),
      ...MOVIE_LIST.map((elem: listsT) => ({
        path: elem.url,
        element: <MoviesListMain />,
      })),
      {
        path: '/movie/:id',
        element: <MoviesDetail />,
      },
      {
        path: '/actor/:id',
        element: <ActorDetail />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Authentication />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

function App(): React.JSX.Element {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
