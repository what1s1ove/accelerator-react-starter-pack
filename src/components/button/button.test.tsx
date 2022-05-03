import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button component', () => {
  test('should be rendered correctly', () => {
    render(<Button title="Test button" type="more" />);
    expect(screen.getByText('Test button')).toBeInTheDocument();
  });
});
