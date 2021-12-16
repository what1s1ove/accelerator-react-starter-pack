import CatalogPageContainer from '../catalog-page-container/catalog-page-container';
import Footer from '../footer/footer';
import Header from '../header/header';
import VisuallyHiddenComponent from '../visually-hidden-component/visually-hidden-component';

function CatalogWrapper(): JSX.Element {
  return (
    <>
      <VisuallyHiddenComponent />
      <div className="wrapper">
        <Header />
        <CatalogPageContainer />
        <Footer />
      </div>
    </>
  );
}

export default CatalogWrapper;
