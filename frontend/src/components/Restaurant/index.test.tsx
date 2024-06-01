import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Restaurant from './index';
import { MemoryRouter } from 'react-router-dom';
import type { RestaurantType, FrancesinhaType } from '../../utils';


const mockRestaurant: RestaurantType = {
  id: 1,
  name: 'Restaurante Fixe',
  address: 'Rua do Restaurante, 1',
  city: 'Coimbra',
  country: 'Portugal',
  rating: 5,
}

const mockFrancesinhas: FrancesinhaType[] = [
  {
    id: 1,
    name: 'Francesinha Fixe',
    price: 10,
    rating: 5,
    image: null,
    restaurant: 'Restaurant',
    ingredients: []
  }
]

describe('Restaurant Component', () => {
  test('renders the Restaurant component', () => {
    const {container} = render(<MemoryRouter><Restaurant restaurant={mockRestaurant} francesinhas={mockFrancesinhas}/></MemoryRouter>);
    const restaurantElement = container.querySelector('.restaurant');
    expect(restaurantElement).toBeInTheDocument();
  });

  test('renders the Restaurant component with the correct name', () => {
    render(<MemoryRouter><Restaurant restaurant={mockRestaurant} francesinhas={mockFrancesinhas}/></MemoryRouter>);
    const restaurantElement = screen.getByText(/Restaurante Fixe/i);
    expect(restaurantElement).toBeInTheDocument();
  });

  test('renders the Restaurant component with the correct address', () => {
    render(<MemoryRouter><Restaurant restaurant={mockRestaurant} francesinhas={mockFrancesinhas}/></MemoryRouter>);
    const restaurantElement = screen.getByText(/Rua do Restaurante, 1/i);
    expect(restaurantElement).toBeInTheDocument();
  });

  test('renders the Restaurant component with the correct city', () => {
    render(<MemoryRouter><Restaurant restaurant={mockRestaurant} francesinhas={mockFrancesinhas}/></MemoryRouter>);
    const restaurantElement = screen.getByText(/Coimbra/i);
    expect(restaurantElement).toBeInTheDocument();
  });

  test('renders the Restaurant component with the correct country', () => {
    render(<MemoryRouter><Restaurant restaurant={mockRestaurant} francesinhas={mockFrancesinhas}/></MemoryRouter>);
    const restaurantElement = screen.getByText(/Portugal/i);
    expect(restaurantElement).toBeInTheDocument();
  });

  test('renders the Restauranr francesinhas', () => {
    render(<MemoryRouter><Restaurant restaurant={mockRestaurant} francesinhas={mockFrancesinhas}/></MemoryRouter>);
    const francesinhaElement = screen.getByText(/Francesinha Fixe/i);
    expect(francesinhaElement).toBeInTheDocument();
  });
});
