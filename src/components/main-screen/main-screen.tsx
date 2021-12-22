import Icons from '../../icons/icons';
import Header from '../header/header';
import Catalog from '../catalog/catalog';
import Footer from '../footer/footer';

function MainScreen():JSX.Element {
  return (
    <>
      <Icons/>
      <div className="wrapper">
        <Header/>
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
              </li>
              <li className="breadcrumbs__item"><a className="link">Каталог</a>
              </li>
            </ul>
            <Catalog />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
export default MainScreen;
