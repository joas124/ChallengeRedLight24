import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import FrancesinhaPage from './index';
import ErrorPage from '../ErrorPage';

const routes = [
  {
    path: '/francesinhas/1',
    element: <FrancesinhaPage />,
    errorElement: <ErrorPage /> 
  }
];

describe('FrancesinhaPage Component', () => {
  test('renders the FrancesinhaPage component', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/francesinhas/1']
    });

    render(
      <RouterProvider router={router} />
    );
    const francesinhaPageElement = document.querySelector('.francesinha-page');
    expect(francesinhaPageElement).toBeInTheDocument();
  });
});
