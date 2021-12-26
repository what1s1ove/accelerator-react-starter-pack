import {Router, Route, Switch} from 'react-router';
import Main from '../main/main';
import {createBrowserHistory} from 'history';

const browserHistory = createBrowserHistory();

function App(): JSX.Element {
  return (
    <Router history={browserHistory}>
      <Switch >
        <Route >
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
