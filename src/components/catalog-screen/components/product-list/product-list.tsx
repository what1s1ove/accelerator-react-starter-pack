import IGuitar from 'models/guitar';
import React, { memo } from 'react';
import ProductCard from '../product-card/product-card';

type Props = {
  guitars: IGuitar[],
  loading: boolean,
}

function ProductList({ guitars, loading }: Props): JSX.Element {
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="cards catalog__cards">
      {!guitars.length
        ? <h1>There is no guitar now</h1>
        : guitars.map((guitar) => <ProductCard key={guitar.id} guitar={guitar}/>)}
    </div>
  );
}

export default memo(ProductList);
