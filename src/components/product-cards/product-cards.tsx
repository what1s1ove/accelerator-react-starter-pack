import { GuitarType } from '../../types/guitar';
import ProductCard from '../product-card/product-card';

type ProductCardsProps = {
  productCards: GuitarType[],
}

function ProductCards(props: ProductCardsProps): JSX.Element {
  const {productCards} = props;
  const cards = productCards.map((card: GuitarType) => (
    <ProductCard
      key={card.id}
      productCard={card}
    />
  ));

  return (
    <div className="cards catalog__cards">
      {cards}
    </div>
  );
}

export default ProductCards;
