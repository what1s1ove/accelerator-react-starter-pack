import CatalogScreen from 'components/catalog-screen/catalog-screen';
import MainScreen from 'components/main-screen/main-screen';
import { GuitarId } from 'models/guitar';
import { RouteProps } from 'react-router-dom';

const MAIN_SCREEN = 'main-screen';
const CATALOG_SCREEN = 'catalog-screen';

const AppRoutes = {
  [MAIN_SCREEN]: '/',
  [CATALOG_SCREEN]: '/catalog',
  getProductPageLink(guitarId: GuitarId): string {
    return `${this[CATALOG_SCREEN]}/${guitarId}`;
  },
};


const AppRoutesProps: { [key: string]: RouteProps} = {
  [MAIN_SCREEN]: {
    path: AppRoutes[MAIN_SCREEN],
    exact: true,
    component: MainScreen,
  },
  [CATALOG_SCREEN]: {
    path: AppRoutes[CATALOG_SCREEN],
    exact: true,
    component: CatalogScreen,
  },
};

export {
  MAIN_SCREEN,
  CATALOG_SCREEN,
  AppRoutes,
  AppRoutesProps
};
