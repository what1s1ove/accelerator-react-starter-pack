import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Catalog } from '../catalog/catalog';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import styles from './app.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGuitarsList } from '../../store/guitars/api-actions';

function App(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGuitarsList());
  }, [dispatch]);

  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <Switch>
          <Route path="/catalog">
            <Catalog />
          </Route>
          <Route path="/address">
            <div className="not-implemented">Address page is not implemented</div>
          </Route>
          <Route path="/about">
            <div className="not-implemented">About page is not implemented</div>
          </Route>
          <Route path="/">
            <div className="not-implemented">Main page is not implemented</div>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>);
}

export default App;
