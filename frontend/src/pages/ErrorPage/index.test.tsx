import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './index';

const routes = [
  {
    errorElement: <ErrorPage /> 
  }
];

describe('ErrorPage Component', () => {
  test('renders the ErrorPage component', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/error']
    });

    render(
      <RouterProvider router={router} />
    );
    const errorPageElement = document.querySelector('.error-page');
    expect(errorPageElement).toBeInTheDocument();
  });
});