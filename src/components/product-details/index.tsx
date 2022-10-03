import { Rating } from '../rating/rating';

export function ProductDetails(props: {
  name: string
  rating: number
  vendorCode: string
  type: string
  stringCount: number
  description: string
  commentsCount: number
}) {
  return (
    <div className="product-container__info-wrapper">
      <h2 className="product-container__title title title--big title--uppercase">{props.name}</h2>
      <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
        <Rating rating={props.rating || 0} commentsCount={props.commentsCount} />
      </div>
      <div className="tabs"><a className="button button--medium tabs__button" href="#characteristics">Характеристики</a><a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
        <div className="tabs__content" id="characteristics">
          <table className="tabs__table">
            <tr className="tabs__table-row">
              <td className="tabs__title">Артикул:</td>
              <td className="tabs__value">{props.vendorCode}</td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Тип:</td>
              <td className="tabs__value">{props.type}</td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Количество струн:</td>
              <td className="tabs__value">{props.stringCount} струнная</td>
            </tr>
          </table>

          <p className="tabs__product-description hidden">
            {props.description}
          </p>
        </div>
      </div>
    </div>);
}
