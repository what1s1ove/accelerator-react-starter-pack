import React from 'react';
import {Router as BrowserRouter, Switch, Route} from 'react-router-dom';
import browserHistory from '../../browser-history';
import {AppRoute} from '../../const';
import MainScreen from '../main-screen/main-screen';

function App(): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Index}>
          <MainScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
