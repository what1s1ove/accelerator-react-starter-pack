import React from 'react';
import ProductCard from '../product-card/product-card';

function ProductList():JSX.Element {
  return (
    <div className="cards catalog__cards">
      <ProductCard />
    </div>
  );
}

export default ProductList;
