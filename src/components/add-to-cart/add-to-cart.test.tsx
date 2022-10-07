import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AddToCart } from '.';

describe('AddToCart Component', () => {
  test('should be rendered correctly', () => {
    render(
      <BrowserRouter>
        <AddToCart price='1000' />
      </BrowserRouter>,
    );

    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });
});

// render(
//   <BrowserRouter>
//     <Basket />
//   </BrowserRouter>,
// );

// expect(screen.getByText('Перейти в корзину')).toBeInTheDocument();
