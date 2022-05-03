import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Catalog } from '../catalog/catalog';
import { Switch, Route } from 'react-router-dom';
import styles from './app.module.css';
import { AppRoutes } from '../../constants/app-routes';
import {NotImplemented} from '../../components/not-implemented/not-implemented';

function App(): JSX.Element {
  return (
    <div className={styles.container}>
      <Header />
      <Switch>
        <Route path={`${AppRoutes.getCatalog()}`} component={Catalog} />
        <Route path={AppRoutes.Address}>
          <NotImplemented text='Address' />
        </Route>
        <Route path={AppRoutes.About}>
          <NotImplemented text='About' />
        </Route>
        <Route path={AppRoutes.Home}>
          <NotImplemented text='Main' />
        </Route>
      </Switch>
      <Footer />
    </div>);
}

export default App;
