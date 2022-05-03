import { fireEvent, render, screen } from '@testing-library/react';
import { Checkbox } from './checkbox';

const handleChange = jest.fn();
describe('Checkbox component', () => {
  test('should be rendered correctly', () => {
    render(<Checkbox id="test-id" label="test" onChange={handleChange} />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  test('should clicked once', () => {
    const isChecked = false;
    render(<Checkbox id="test-id" label="test" onChange={handleChange} checked={isChecked} />);
    const checkbox = screen.getByTestId('checkbox-test');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
