import { useSelector } from 'react-redux';
import { FetchStatus } from '../../const';
import { getCatalogFetchStatusSelector, getGuitars } from '../../store/selectors';
import CatalogFilters from '../catalog-filters/catalog-filters';
import CatalogPagination from '../catalog-pagination/catalog-pagination';
import CatalogSort from '../catalog-sort/catalog-sort';
import ProductCards from '../product-cards/product-cards';

function Catalog(): JSX.Element {
  const catalogCards = useSelector(getGuitars);
  const fetchStatus = useSelector(getCatalogFetchStatusSelector);

  return (
    <div className="catalog" data-testid='catalog'>
      <CatalogFilters />
      <CatalogSort />
      {
        fetchStatus === FetchStatus.InProgress
        && <>Loading...</>
      }
      {
        fetchStatus === FetchStatus.Success
        && catalogCards.length > 0
        &&
        <ProductCards productCards={catalogCards} />
      }
      <CatalogPagination />
    </div>
  );
}

export default Catalog;
