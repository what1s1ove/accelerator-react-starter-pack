import { render, screen } from '@testing-library/react';
import { H2 } from './h2';

describe('H2 component', () => {
  test('should be rendered correctly', () => {
    render(<H2 title="title" />);
    expect(screen.getByText('title')).toBeInTheDocument();
  });
});
