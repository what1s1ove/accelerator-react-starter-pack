import React from 'react';
import ProductList from '../product-list/product-list';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import Pagination from '../pagination/pagination';

function CatalogScreen(): JSX.Element {
  return (
    <div className="catalog">
      <CatalogFilter />
      <CatalogSort />
      <ProductList />
      <Pagination />
    </div>
  );
}

export default CatalogScreen;
