export function AddToCart(props: {
  price: string
}) {
  return (
    <div className="product-container__price-wrapper">
      <p className="product-container__price-info product-container__price-info--title">Цена:</p>
      <p className="product-container__price-info product-container__price-info--value">{props.price} ₽</p>
      <a className="button button--red button--big product-container__button" href="/">Добавить в корзину</a>
    </div>);
}
