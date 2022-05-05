import { render, screen } from '@testing-library/react';
import { SortingFilter } from './sorting-filter';

describe('SortingFilter component', () => {
  test('should be rendered correctly', () => {
    render(
      <SortingFilter
        onSortingButtonClickHandler={jest.fn()}
        onOrderButtonClickHandler={jest.fn()}
        isButtonUpActive
        isButtonDownActive={false}
        isButtonSortingPrice
        isButtonSortingRating={false}
      />);
    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
  });
});
