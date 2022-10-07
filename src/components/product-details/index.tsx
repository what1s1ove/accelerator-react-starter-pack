import cn from 'classnames';
import { useTabs } from '../../hooks/use-tabs';
import { Rating } from '../rating/rating';

const TabName = {
  Characteristics: 'Характеристики',
  Description: 'Описание',
};

const Tabs: Array<string> = ['Характеристики', 'Описание'];

export function ProductDetails(props: {
  name: string
  rating: number
  vendorCode: string
  type: string
  stringCount: number
  description: string
  commentsCount: number
}) {
  const [selectedTab, onTabClickHandler] = useTabs(TabName.Characteristics);

  return (
    <div className="product-container__info-wrapper">
      <h2 className="product-container__title title title--big title--uppercase">{props.name}</h2>
      <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
        <Rating rating={props.rating || 0} commentsCount={props.commentsCount} />
      </div>
      <div className="tabs">
        {Tabs.map((item: string) => (
          <button
            key={item}
            className={cn('button button--medium tabs__button', item !== selectedTab && 'button--black-border')}
            onClick={() => onTabClickHandler(item)}
          >
            {item}
          </button>
        ))}

        <div className="tabs__content" id="characteristics">
          {
            selectedTab === TabName.Characteristics &&
            <table className="tabs__table">
              <tbody>
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
              </tbody>
            </table>
          }

          {
            selectedTab === TabName.Description &&
            <p className="tabs__product-description">
              {props.description}
            </p>
          }
        </div>
      </div>
    </div>);
}
