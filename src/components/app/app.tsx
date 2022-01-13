import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppRoute} from '../../const';
import Main from '../main/main';
import GuitarPage from '../guitar-page/guitar-page';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Root} component={Main}/>
        <Route exact path={AppRoute.Catalog} component={Main}/>
        <Route exact path={AppRoute.GuitarPage} component={GuitarPage}/>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
