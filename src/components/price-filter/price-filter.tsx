import { ChangeEventHandler } from 'react';
import { FilterType } from '../filter-type/filter-type';
import { InputPrice } from '../input-price/input-price';
import styles from './price-filter.module.css';

export function PriceFilter(props: {
  handleMinPriceChange: ChangeEventHandler<HTMLInputElement>
  handleMaxPriceChange: ChangeEventHandler<HTMLInputElement>
}) {
  return (
    <FilterType title="Цена, ₽">
      <div className={styles.filters}>
        <InputPrice placeholder='1000' id="priceMin" name="от" onChange={props.handleMinPriceChange} />
        <InputPrice placeholder='30000' id="priceMax" name="до" onChange={props.handleMaxPriceChange} />
      </div>
    </FilterType>
  );
}
