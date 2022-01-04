import {Route, Switch} from 'react-router-dom';
import {AppRoute} from '../../const/const';
import MainScreen from '../main-screen/main-screen';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.Root}>
        <MainScreen />
      </Route>
      <Route exact path={'/guitars'}>
        <MainScreen />
      </Route>
    </Switch>
  );
}

export default App;
