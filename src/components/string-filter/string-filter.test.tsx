import { render, screen } from '@testing-library/react';
import { StringFilter } from './string-filter';

describe('StringFilter component', () => {
  test('should be rendered correctly', () => {
    render(
      <StringFilter onChange={jest.fn()} />);
    expect(screen.getByText('Количество струн')).toBeInTheDocument();
  });
});
