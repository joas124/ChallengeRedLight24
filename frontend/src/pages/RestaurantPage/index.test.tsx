import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import RestaurantPage from './index';
import ErrorPage from '../ErrorPage';

const routes = [
  {
    path: '/restaurants/1',
    element: <RestaurantPage />,
    errorElement: <ErrorPage /> 
  }
];

describe('RestaurantPage Component', () => {
  test('renders the RestaurantPage component', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/restaurants/1']
    });

    render(
      <RouterProvider router={router} />
    );
    const restaurantPageElement = document.querySelector('.restaurant-page');
    expect(restaurantPageElement).toBeInTheDocument();
  });
});

