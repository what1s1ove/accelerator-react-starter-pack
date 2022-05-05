import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Catalog } from '../catalog/catalog';
import { Switch, Route } from 'react-router-dom';
import styles from './app.module.css';
import { AppRoute } from '../../constants/app-route';
import {NotImplemented} from '../../components/not-implemented/not-implemented';

function App(): JSX.Element {
  return (
    <div className={styles.container}>
      <Header />
      <Switch>
        <Route path={`${AppRoute.getCatalog()}`} component={Catalog} />
        <Route path={AppRoute.Address}>
          <NotImplemented text='Address' />
        </Route>
        <Route path={AppRoute.About}>
          <NotImplemented text='About' />
        </Route>
        <Route path={AppRoute.Home}>
          <NotImplemented text='Main' />
        </Route>
      </Switch>
      <Footer />
    </div>);
}

export default App;
