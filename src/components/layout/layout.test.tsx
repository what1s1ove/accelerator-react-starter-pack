import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from '.';
import { getMockStore, mockStore } from '../../helpers/get-mock-store';

describe('Layout component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = getMockStore();
  });
  test('rendered correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Layout>Test</Layout>
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
