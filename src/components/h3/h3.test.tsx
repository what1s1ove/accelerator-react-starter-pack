import { render, screen } from '@testing-library/react';
import { H3 } from './h3';

describe('H3 component', () => {
  test('should be rendered correctly', () => {
    render(<H3 title="title" />);
    expect(screen.getByText('title')).toBeInTheDocument();
  });
});
