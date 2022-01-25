import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect';
import ProductCard from './product-card';
import { makeFakeGuitar } from '../../../utils/mocks';


describe('Component: ProductCard', () => {
  test('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ProductCard guitar={makeFakeGuitar()} />,
      </Router>,
    );
    const imgElement = screen.getByAltText(/СURT Z30 Plus Acoustics/i);
    const linkElement = screen.getByRole('link', { name: /Купить/i });

    expect(imgElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
