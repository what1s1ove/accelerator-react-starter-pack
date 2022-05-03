import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './header';
import { getMockStore, mockStore } from '../../helpers/get-mock-store';

describe('Header component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = getMockStore();
  });

  test('should be rendered correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByText('Каталог')).toBeInTheDocument();
  });

  test('should add link--current class on clicked link', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );

    const links = screen.getAllByTestId('nav-links-catalog');
    fireEvent.click(links[0]);
    expect(links[0]).toHaveClass('link--current');
  });
});
