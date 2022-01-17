import React from 'react';
import { Link } from 'react-router-dom';
import Filter from '../filter/filter';
import Footer from '../footer/footer';
import GuitarsList from '../guitars-list/guitars-list';
import Header from '../header/header';
function Catalog(): JSX.Element {

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <Link className="link" to="./main.html">Главная</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to="">Каталог</Link>
            </li>
          </ul>
          <div className="catalog">
            <Filter />
            <GuitarsList />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Catalog;
