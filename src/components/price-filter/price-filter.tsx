import { FilterType } from '../filter-type/filter-type';
import { InputPrice } from '../input-price/input-price';
import styles from './price-filter.module.css';

export function PriceFilter() {
  return (
    <FilterType title="Цена, ₽">
      <div className={styles.filters}>
        <InputPrice placeholder='1000' id="priceMin" name="от" />
        <InputPrice placeholder='30000' id="priceMax" name="до" />
      </div>
    </FilterType>
  );
}
