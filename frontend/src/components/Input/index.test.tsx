import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Input from './index';


describe('Input Component', () => {
  test('renders the input label', () => {
    render(<Input label='testLabel' name='testName' error='testError' defaultVal='testDefault'/>);
    const inputElement = screen.getByText(/testLabel/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('renders the input error', () => {
    render(<Input label='testLabel' name='testName' error='testError' defaultVal='testDefault'/>);
    const inputElement = screen.getByText(/testError/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('renders the input default value', () => {
    const {container} = render(<Input label='testLabel' name='testName' error='testError' defaultVal='testDefault'/>);
    const inputElement = container.querySelector('input');
    expect(inputElement).toHaveValue('testDefault');
  });
});
