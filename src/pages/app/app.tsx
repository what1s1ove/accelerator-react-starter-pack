import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Catalog } from '../catalog/catalog';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import styles from './app.module.css';
import { AppRoutes } from '../../constants/app-routes';
import {NotImplemented} from '../../components/not-implemented/not-implemented';

function App(): JSX.Element {
  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <Switch>
          <Route path={`${AppRoutes.getCatalog()}`} component={Catalog} />
          <Route path={AppRoutes.Address} component={NotImplemented} />
          <Route path={AppRoutes.About} component={NotImplemented} />
          <Route path={AppRoutes.Home} component={NotImplemented} />
        </Switch>
        <Footer />
      </div>
    </Router>);
}

export default App;
