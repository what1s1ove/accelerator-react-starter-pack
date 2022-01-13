import {createMemoryHistory} from 'history';
import {setupApiStore} from '../../service/test-utils';
import {mainAPI} from '../../service/api';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import NotFoundPage from './not-found-page';

const history = createMemoryHistory();
const storeRef = setupApiStore(mainAPI);

describe('Component: NotFoundPage', () => {

  it('should render correctly', () => {
    render(
      <Provider store={storeRef.store}>
        <Router history={history}>
          <Route render={() => <NotFoundPage/>}>
          </Route>
        </Router>
      </Provider>);
    expect(screen.getByText(/404 Page Not Found/i)).toBeInTheDocument();
  });
});
