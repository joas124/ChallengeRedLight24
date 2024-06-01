import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './index';

describe('Navbar Component', () => {
  test('renders the navbar component', () => {
    const {container} = render(<MemoryRouter><Navbar /></MemoryRouter>);
    const navbarElement = container.querySelector('.nav-bar');
    expect(navbarElement).toBeInTheDocument();
  });
});
