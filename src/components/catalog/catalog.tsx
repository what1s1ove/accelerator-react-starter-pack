import { useSelector } from 'react-redux';
import { getGuitars } from '../../store/selectors';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogPagination from '../catalog-pagination/catalog-pagination';
import CatalogSort from '../catalog-sort/catalog-sort';
import ProductCards from '../product-cards/product-cards';

function Catalog(): JSX.Element {
  const catalogCards = useSelector(getGuitars);

  return (
    <div className="catalog">
      <CatalogFilter />
      <CatalogSort />
      <ProductCards productCards={catalogCards} />
      <CatalogPagination />
    </div>
  );
}

export default Catalog;
