import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from './footer';

describe('Footer component', () => {
  test('should be rendered correctly', () => {
    render(<BrowserRouter><Footer /></BrowserRouter>);
    expect(screen.getByText(/Магазин гитар, музыкальных инструментов/)).toBeInTheDocument();
    expect(screen.getByText(/Режим работы:/)).toBeInTheDocument();
  });
});
