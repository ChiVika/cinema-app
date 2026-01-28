import 'normalize.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import Layout from './layouts/Main/Layout';
import CinemaDetailsPage from './pages/CinemaDetailsPage/CinemaDetailsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <MainPage/>,
      },
      {
        path: '/cinema/:id',
        element: <CinemaDetailsPage/>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
