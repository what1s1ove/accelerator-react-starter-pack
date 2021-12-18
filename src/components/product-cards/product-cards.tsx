import { useSelector } from 'react-redux';
import { getDataLoadingStatus } from '../../store/selectors';
import { GuitarType } from '../../types/guitar';
import ProductCard from '../product-card/product-card';

type ProductCardsProps = {
  productCards: GuitarType[],
}

function ProductCards(props: ProductCardsProps): JSX.Element {
  const {productCards} = props;
  const isLoaded = useSelector(getDataLoadingStatus);

  return (
    <div className="cards catalog__cards">
      {
        isLoaded ?
          productCards.map((card: GuitarType) => (
            <ProductCard
              key={card.id}
              productCard={card}
            />
          ))
          :
          <>Loading...</>
      }
    </div>
  );
}

export default ProductCards;
