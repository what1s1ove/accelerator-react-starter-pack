import { render, screen } from '@testing-library/react';
import { FilterType } from './filter-type';

describe('FilterType component', () => {
  test('should be rendered correctly', () => {
    render(<FilterType title="filter">Test children</FilterType>);
    expect(screen.getByText('Test children')).toBeInTheDocument();
  });
});
