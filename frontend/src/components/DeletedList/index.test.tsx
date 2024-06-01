import '@testing-library/jest-dom'
import DeletedList from './index';
import { render, screen } from '@testing-library/react';
import type { FrancesinhaType } from '../../utils';

const mockItems: FrancesinhaType[] = [];
function mockFunction() {}


describe('DeletedList Component', () => {
  test('renders the deleted list component', () => {
    render(<DeletedList deletedItems={mockItems} type='francesinha' handleDelete={mockFunction} handleRestore={mockFunction}/>);
    const listElement = screen.getByText(/Deleted Francesinhas/i);
    expect(listElement).toBeInTheDocument();
  });
});
