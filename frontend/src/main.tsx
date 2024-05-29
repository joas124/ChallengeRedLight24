import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './components/Navbar'
import ErrorPage from './pages/ErrorPage'
import FrancesinhasListPage from './pages/FrancesinhasListPage'
import FrancesinhaPage from './pages/FrancesinhaPage'
import RestaurantsListPage from './pages/RestaurantsListPage'
import RestaurantPage from './pages/RestaurantPage'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        path: '/francesinhas',
        element: <FrancesinhasListPage />,
      },
      {
        path: '/francesinhas/:id',
        element: <FrancesinhaPage />,
      },
      {
        path: '/francesinhas/:id/edit',
        // element: <EditFrancesinhaPage />,
      },
      {
        path: '/francesinhas/create',
        // element: <CreateFrancesinhaPage />,
      },
      {
        path: '/restaurants',
        element: <RestaurantsListPage />,
      },
      {
        path: '/restaurants/:id',
        element: <RestaurantPage />,
      },
      {
        path: '*', // 404
        element: <ErrorPage />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
