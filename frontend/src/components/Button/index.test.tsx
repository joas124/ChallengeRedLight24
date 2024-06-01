import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './index';

describe('Button Component', () => {
  test('renders the button with correct text', () => {
    render(<Button text='botao'/>);
    const buttonElement = screen.getByText(/botao/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button handleClick={handleClick} text='botao-click' />);
    const buttonElement = screen.getByText(/botao-click/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
