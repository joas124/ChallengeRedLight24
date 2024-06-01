import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import StarRating from './index';

describe('StarRating Component', () => {
  test('renders the StarRating component', () => {
    const {container} = render(<StarRating rating={"3"} />);
    const starRatingElement = container.querySelector('.star-rating');
    expect(starRatingElement).toBeInTheDocument();
  });
});