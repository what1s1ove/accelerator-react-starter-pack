import { render, screen } from '@testing-library/react';
import { NotImplemented } from './not-implemented';

describe('H2 component', () => {
  test('should be rendered correctly', () => {
    render(<NotImplemented />);
    expect(screen.getByText('Current page is not implemented')).toBeInTheDocument();
  });
});
