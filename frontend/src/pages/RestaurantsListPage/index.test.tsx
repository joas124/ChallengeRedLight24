import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import RestaurantListPage from './index';
import ErrorPage from '../ErrorPage';

const routes = [
  {
    path: '/restaurants/',
    element: <RestaurantListPage />,
    errorElement: <ErrorPage /> 
  }
];

describe('FrancesinhaPage Component', () => {
  test('renders the FrancesinhaPage component', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/restaurants/']
    });

    render(
      <RouterProvider router={router} />
    );
    const francesinhaPageElement = document.querySelector('.list-page');
    expect(francesinhaPageElement).toBeInTheDocument();
  });
});
