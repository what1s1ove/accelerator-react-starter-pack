import { Route, Router as BrowserRouter, Switch } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';
import CatalogWrapper from '../catalog-wrapper/catalog-wrapper';
import PageNotFound from '../page-not-found/page-not-found';

function App(): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Catalog}>
          <CatalogWrapper />
        </Route>
        <Route path={AppRoute.Pagination}>
          <CatalogWrapper />
        </Route>
        <Route exact path={AppRoute.PageNotFound}>
          <PageNotFound/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
