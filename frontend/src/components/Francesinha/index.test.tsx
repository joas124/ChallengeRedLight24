import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Francesinha from './index';
import { MemoryRouter } from 'react-router-dom';
import type { FrancesinhaType, IngredientType } from '../../utils';


const mockIngredient: IngredientType = {
  id: 1,
  name: 'bread'
}

const mockFrancesinha: FrancesinhaType = {
  id: 1,
  name: 'Francesinha',
  price: 10,
  rating: 5,
  image: null,
  restaurant: 'Restaurant',
  ingredients: [mockIngredient]
}

describe('Francesinha Component', () => {
  test('renders the Francesinha component', () => {
    const {container} = render(<MemoryRouter><Francesinha francesinha={mockFrancesinha}/></MemoryRouter>);
    const francesinhaElement = container.querySelector('.francesinha');
    expect(francesinhaElement).toBeInTheDocument();
  });
});

describe('Francesinha Component', () => {
  test('renders the Francesinha component with the correct name', () => {
    render(<MemoryRouter><Francesinha francesinha={mockFrancesinha}/></MemoryRouter>);
    const francesinhaElement = screen.getByText(/Francesinha/i);
    expect(francesinhaElement).toBeInTheDocument();
  });
});

describe('Francesinha Component', () => {
  test('renders the Francesinha component with the correct price', () => {
    render(<MemoryRouter><Francesinha francesinha={mockFrancesinha}/></MemoryRouter>);
    const francesinhaElement = screen.getByText(/10€/i);
    expect(francesinhaElement).toBeInTheDocument();
  });
});


describe('Francesinha Component', () => {
  test('renders the Francesinha component with the correct ingredients', () => {
    render(<MemoryRouter><Francesinha francesinha={mockFrancesinha}/></MemoryRouter>);
    const francesinhaElement = screen.getByText(/bread/i);
    expect(francesinhaElement).toBeInTheDocument();
  });
});
