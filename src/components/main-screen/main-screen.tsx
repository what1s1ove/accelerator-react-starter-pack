import React from 'react';
import HeaderScreen from '../header-screen/header-screen';
import CatalogScreen from '../catalog-screen/catalog-screen';
import FooterScreen from '../footer-screen/footer-screen';

function MainScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <HeaderScreen />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="/">Главная</a></li>
            <li className="breadcrumbs__item"><a className="link">Каталог</a></li>
          </ul>
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
