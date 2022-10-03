import { render, screen } from '@testing-library/react';
import { ProductItem } from './product-item';

describe('ProductItem component', () => {
  test('should be rendered correctly', () => {
    render(
      <ProductItem
        id="2"
        price={1000}
        name="Test name"
        previewImg="/public/img/guitar-1.jpg"
        rating={4}
        alt="Alt text"
      />);

    expect(screen.getByText('Test name')).toBeInTheDocument();
  });
});
