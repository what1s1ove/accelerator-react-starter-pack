import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { getMockStore, mockStore } from '../../helpers/get-mock-store';
import { InputSearch } from './input-search';

describe('InputSearch component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = getMockStore();
    store.dispatch = jest.fn();
  });

  test('should be rendered correctly', () => {
    render(
      <Provider store={store}>
        <InputSearch />
      </Provider>,
    );
    expect(screen.getByText('Начать поиск')).toBeInTheDocument();
  });

  test('should call on change event', () => {
    render(
      <Provider store={store}>
        <InputSearch />
      </Provider>,
    );

    const input = screen.getByTestId('search-guitars');
    fireEvent.change(input, {target: {value: 'value'}});
    expect(store.dispatch).toBeCalledTimes(1);
  });
});
