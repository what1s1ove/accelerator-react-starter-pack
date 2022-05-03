import { render, screen } from '@testing-library/react';
import { Rating } from './rating';

describe('Rating component', () => {
  test('should be rendered correctly', () => {
    render(<Rating rating={4} />);

    expect(screen.getAllByTestId('full-star')).toHaveLength(4);
  });
});
