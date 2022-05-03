import { render, screen } from '@testing-library/react';
import { PriceFilter } from './price-filter';

describe('PriceFilter component', () => {
  test('should be rendered correctly', () => {
    render(<PriceFilter handleMinPriceChange={jest.fn()} handleMaxPriceChange={jest.fn()} />);
    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
  });
});
