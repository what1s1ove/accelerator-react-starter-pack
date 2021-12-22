import CatalogPriceFilter from './catalog-price-filter';
import CatalogStringsFilter from './catalog-strings-filter';
import CatalogTypesFilter from './catalog-types-filter';

function CatalogFilter(): JSX.Element {
  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <CatalogPriceFilter />
      <CatalogTypesFilter />
      <CatalogStringsFilter />
    </form>
  );
}

export default CatalogFilter;
