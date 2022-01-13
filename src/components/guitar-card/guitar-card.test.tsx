import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import GuitarCard from './guitar-card';
import {makeFakeGuitar} from '../../mocks/mocks';
import {setupApiStore} from '../../service/test-utils';
import {mainAPI} from '../../service/api';
import {createMemoryHistory} from 'history';

const fakeGuitar = makeFakeGuitar();
const storeRef = setupApiStore(mainAPI);
const history = createMemoryHistory();

describe('Component: GuitarCard', () => {
  it('should render correctly', () => {
    render(
      <Provider store={storeRef.store}>
        <Router history={history}>
          <Route render={() => <GuitarCard guitar={fakeGuitar}/>}>
          </Route>
        </Router>
      </Provider>);
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByText(`${fakeGuitar.price} ₽`)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
  });
});
