import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import FrancesinhaListPage from './index';
import ErrorPage from '../ErrorPage';

const routes = [
  {
    path: '/francesinhas/',
    element: <FrancesinhaListPage />,
    errorElement: <ErrorPage /> 
  }
];

describe('FrancesinhaPage Component', () => {
  test('renders the FrancesinhaPage component', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/francesinhas/']
    });

    render(
      <RouterProvider router={router} />
    );
    const francesinhaPageElement = document.querySelector('.list-page');
    expect(francesinhaPageElement).toBeInTheDocument();
  });
});
