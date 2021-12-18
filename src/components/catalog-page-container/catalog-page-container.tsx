import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Catalog from '../catalog/catalog';

function CatalogPageContainer(): JSX.Element {
  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
        <Breadcrumbs />
        <Catalog />
      </div>
    </main>
  );
}

export default CatalogPageContainer;
