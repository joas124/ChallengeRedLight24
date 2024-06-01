import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './index';
import ErrorPage from '../ErrorPage';

const routes = [
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage /> 
  }
];

describe('LandingPage Component', () => {
  test('renders the LandingPage component', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/']
    });

    render(
      <RouterProvider router={router} />
    );
    const landingPageElement = document.querySelector('.landing-page');
    expect(landingPageElement).toBeInTheDocument();
  });
});
