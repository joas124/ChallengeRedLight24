import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import RestaurantFormPage from './index';
import ErrorPage from '../ErrorPage';

const routes = [
  {
    path: '/restaurants/add',
    element: <RestaurantFormPage />,
    errorElement: <ErrorPage /> 
  }
];

describe('RestaurantFormPage Component', () => {
  test('renders the RestaurantFormPage component', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/restaurants/add']
    });

    render(
      <RouterProvider router={router} />
    );
    const restaurantFormPageElement = document.querySelector('.form-div');
    expect(restaurantFormPageElement).toBeInTheDocument();
  });
});
