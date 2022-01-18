import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { Switch } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getPageNumber } from '../../store/guitars/selectors';
import Catalog from '../catalog/catalog';
import NotFound from '../not-found/not-found';
import Product from '../product/product';

function App(): JSX.Element {
  const pageNumber = useSelector(getPageNumber);
  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <Redirect to={AppRoute.Catalog.replace(':id', pageNumber ? pageNumber.toString() : '1')} />
      </Route>
      <Route exact path={AppRoute.Catalog}>
        <Catalog />
      </Route>
      <Route exact path={AppRoute.Product}>
        <Product />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
