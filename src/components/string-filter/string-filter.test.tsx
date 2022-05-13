import { render, screen } from '@testing-library/react';
import { StringFilter } from './string-filter';

describe('StringFilter component', () => {
  test('should be rendered correctly', () => {
    render(
      <StringFilter onChange={jest.fn()} stringsForChosenGuitars={[1, 2]} />);
    expect(screen.getByText('Количество струн')).toBeInTheDocument();
  });
});
