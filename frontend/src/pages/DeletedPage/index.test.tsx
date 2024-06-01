import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import DeletedPage from './index';


describe('DeletedPage Component', () => {
  test('renders the DeletedPage component', () => {
    render(<DeletedPage />);
    const deletedPageElement = document.querySelector('.deleted-page');
    expect(deletedPageElement).toBeInTheDocument();
  });
});