import { ChangeEventHandler } from 'react';
import { FilterType } from '../filter-type/filter-type';
import { InputPrice } from '../input-price/input-price';

export function PriceFilter(props: {
  handleMinPriceChange: ChangeEventHandler<HTMLInputElement>
  handleMaxPriceChange: ChangeEventHandler<HTMLInputElement>
}) {
  return (
    <FilterType title="Цена, ₽">
      <div className="catalog-filter__price-range">
        <InputPrice label="Минимальная цена" placeholder='1000' id="priceMin" name="от" onChange={props.handleMinPriceChange} />
        <InputPrice label="Максимальная цена" placeholder='30000' id="priceMax" name="до" onChange={props.handleMaxPriceChange} />
      </div>
    </FilterType>
  );
}
