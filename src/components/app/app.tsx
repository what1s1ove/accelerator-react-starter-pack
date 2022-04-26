import React from 'react';
import {Router as BrowserRouter, Switch, Route} from 'react-router-dom';
import browserHistory from '../../browser-history';
import {AppRoute} from '../../const';
import MainScreen from '../main-screen/main-screen';
import GuitarCardFull from '../guitar-card-full/guitar-card-full';

function App(): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainScreen />
        </Route>
        <Route exact path={AppRoute.Guitar}>
          <GuitarCardFull />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
