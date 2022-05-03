import { fireEvent, render, screen } from '@testing-library/react';
import { GuitarTypeFilter } from './guitar-type-filter';

const handleCheckboxChange = jest.fn();

describe('GuitarTypeFilter component', () => {
  test('should be rendered correctly', () => {
    render(<GuitarTypeFilter onChange={handleCheckboxChange} />);
    expect(screen.getByText('Акустические гитары')).toBeInTheDocument();
  });

  test('checkbox should be clicked once', () => {
    render(<GuitarTypeFilter onChange={handleCheckboxChange} />);
    const checkbox = screen.getAllByTestId('checkbox-test');
    fireEvent.click(checkbox[0]);
    expect(handleCheckboxChange).toHaveBeenCalledTimes(1);
  });
});
