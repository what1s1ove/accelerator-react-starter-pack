import { Route, Switch } from 'react-router-dom';
import { AppRoute } from '../../const';
import CatalogWrapper from '../catalog-wrapper/catalog-wrapper';
import PageNotFound from '../page-not-found/page-not-found';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.Catalog}>
        <CatalogWrapper />
      </Route>
      <Route path={AppRoute.Pagination}>
        <CatalogWrapper />
      </Route>
      <Route path={AppRoute.PageNotFound}>
        <PageNotFound/>
      </Route>
    </Switch>
  );
}

export default App;
