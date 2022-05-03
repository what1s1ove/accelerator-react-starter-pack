import { render, screen } from '@testing-library/react';
import { InputPrice } from './input-price';

describe('InputPrice component', () => {
  test('should be rendered correctly', () => {
    render(<InputPrice id="min" name="min-price" label="Минимальная цена" placeholder="100" onChange={jest.fn()} />);
    expect(screen.getByText('Минимальная цена')).toBeInTheDocument();
  });

  test('should be focused', () => {
    render(<InputPrice id="min" name="min-price" label="Минимальная цена" placeholder="100" onChange={jest.fn()} />);
    const input = screen.getByTestId('price-input');
    input.focus();
    expect(input).toHaveFocus();
  });
});
