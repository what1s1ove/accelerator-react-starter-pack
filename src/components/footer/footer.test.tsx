import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const {getByText} = render(
      <Router history={history}>
        <Footer />
      </Router>,
    );
    const firstElement = getByText('О нас');
    const secondElement = getByText('Информация');
    const thirdElement = getByText('Контакты');

    expect(firstElement).toBeInTheDocument();
    expect(secondElement).toBeInTheDocument();
    expect(thirdElement).toBeInTheDocument();
  });
});
