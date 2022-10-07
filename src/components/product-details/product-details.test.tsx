import { render, screen } from '@testing-library/react';
import { ProductDetails } from '.';

describe('ProductDetails Component', () => {
  test('should rendered correctly', () => {
    render(
      <ProductDetails
        name="Test"
        rating={4}
        vendorCode="123"
        type="Guitar"
        stringCount={7}
        description="Some description"
        commentsCount={2}
      />,
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
