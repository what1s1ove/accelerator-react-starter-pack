import { BrowserRouter } from 'react-router-dom';
import { Basket } from './basket';
import { render, screen } from '@testing-library/react';

describe('Basket component', () => {
  it('Should be rendered correctly', () => {
    render(
      <BrowserRouter>
        <Basket />
      </BrowserRouter>,
    );

    expect(screen.getByText('Перейти в корзину')).toBeInTheDocument();
  });
});
