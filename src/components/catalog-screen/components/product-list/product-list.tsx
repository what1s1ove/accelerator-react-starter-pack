import Loader from 'components/common/loader/loader';
import Message from 'components/common/message/message';
import IGuitar from 'models/guitar';
import React, { memo } from 'react';
import ProductCard from '../product-card/product-card';

const NO_GUITAR_MESSAGE = 'К сожалению данный момент нет товаров в наличий';

type Props = {
  guitars: IGuitar[],
  loading: boolean,
}

function ProductList({ guitars, loading }: Props): JSX.Element {
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="cards catalog__cards">
      {!guitars.length
        ? <Message message={NO_GUITAR_MESSAGE}/>
        : guitars.map((guitar) => <ProductCard key={guitar.id} guitar={guitar}/>)}
    </div>
  );
}

export default memo(ProductList);
