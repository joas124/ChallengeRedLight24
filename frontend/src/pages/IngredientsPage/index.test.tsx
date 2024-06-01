import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import IngredientsPage from './index';
import ErrorPage from '../ErrorPage';

const routes = [
  {
    path: '/ingredients/',
    element: <IngredientsPage />,
    errorElement: <ErrorPage /> 
  }
];

describe('IngredientsPage Component', () => {
  test('renders the IngredientsPage component', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/ingredients/']
    });

    render(
      <RouterProvider router={router} />
    );
    const ingredientsPageElement = document.querySelector('.list-page');
    expect(ingredientsPageElement).toBeInTheDocument();
  });
});
