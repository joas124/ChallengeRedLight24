import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import FrancesinhaFormPage from './index';
import ErrorPage from '../ErrorPage';

const routes = [
  {
    path: '/francesinhas/add',
    element: <FrancesinhaFormPage />,
    errorElement: <ErrorPage />
  }
];

describe('FrancesinhaFormPage Component', () => {
  test('renders the FrancesinhaFormPage component', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/francesinhas/add']
    });

    render(
      <RouterProvider router={router} />
    );
    const francesinhaFormPageElement = document.querySelector('.francesinha-form');
    expect(francesinhaFormPageElement).toBeInTheDocument();
  });
});