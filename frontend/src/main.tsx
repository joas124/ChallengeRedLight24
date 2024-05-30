import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import ErrorPage from './pages/ErrorPage'
import FrancesinhasListPage from './pages/FrancesinhasListPage'
import FrancesinhaPage from './pages/FrancesinhaPage'
import FrancesinhaFormPage from './pages/FrancesinhaFormPage'
import RestaurantsListPage from './pages/RestaurantsListPage'
import RestaurantPage from './pages/RestaurantPage'
import RestaurantFormPage from './pages/RestaurantFormPage'
import IngredientsPage from './pages/IngredientsPage'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        path: '/francesinhas',
        element: <FrancesinhasListPage />,
      },
      {
        path: '/francesinhas/search',
        element: <FrancesinhasListPage />,
      },
      {
        path: '/francesinhas/:id',
        element: <FrancesinhaPage />,
      },
      {
        path: '/francesinhas/:id/edit',
        element: <FrancesinhaFormPage />,
      },
      {
        path: '/francesinhas/add',
        element: <FrancesinhaFormPage />,
      },
      {
        path: '/restaurants',
        element: <RestaurantsListPage />,
      },
      {
        path: '/restaurants/search',
        element: <RestaurantsListPage />,
      },
      {
        path: '/restaurants/:id',
        element: <RestaurantPage />,
      },
      {
        path: '/restaurants/:id/edit',
        element: <RestaurantFormPage />,
      },
      {
        path: '/restaurants/add',
        element: <RestaurantFormPage />,
      },
      {
        path: '/ingredients',
        element: <IngredientsPage />,
      },
      {
        path: '/ingredients/search',
        element: <IngredientsPage />,
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
