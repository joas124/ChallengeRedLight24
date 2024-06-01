import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import SearchBar from './index';
import { MemoryRouter } from 'react-router-dom';

describe ('SearchBar Component', () => {
  test('renders the SearchBar component', () => {
    const {container} = render(<MemoryRouter><SearchBar className='search-bar-nav' /></MemoryRouter>);
    const searchBarElement = container.querySelector('.search-bar-nav');
    expect(searchBarElement).toBeInTheDocument();
  });
});