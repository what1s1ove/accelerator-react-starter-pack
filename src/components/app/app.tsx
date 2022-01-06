import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppRoute } from '../../const';
import Catalog from '../catalog/catalog';
import NotFound from '../not-found/not-found';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.Catalog}>
        <Catalog />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
