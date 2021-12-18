import { Route, Switch } from 'react-router-dom';
import { AppRoutesProps, CATALOG_SCREEN, MAIN_SCREEN } from 'constants/routes';

function AppRouter(): JSX.Element {
  return (
    <Switch>
      <Route
        {...AppRoutesProps[MAIN_SCREEN]}
      />
      <Route
        {...AppRoutesProps[CATALOG_SCREEN]}
      />
    </Switch>
  );
}

export default AppRouter;
