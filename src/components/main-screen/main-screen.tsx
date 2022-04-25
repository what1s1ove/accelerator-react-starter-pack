import React from 'react';
import HeaderScreen from '../header-screen/header-screen';
import CatalogScreen from '../catalog-screen/catalog-screen';
import FooterScreen from '../footer-screen/footer-screen';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';

function MainScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <HeaderScreen />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <CatalogScreen />
        </div>
      </main>
      <footer className="footer">
        <FooterScreen />
      </footer>
    </div>
  );
}

export default MainScreen;
