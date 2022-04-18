import { Checkbox } from '../checkbox/checkbox';
import { FilterType } from '../filter-type/filter-type';
import styles from './string-filter.module.css';

const strings = [
  {id: 'four', quantity: '4'},
  {id: 'six', quantity: '6'},
  {id: 'seven', quantity: '7'},
  {id: 'twelve', quantity: '12'},
];

export function StringFilter() {
  return (
    <FilterType title="Количество струн">
      <ul className={styles.list}>
        {strings.map((item) => (
          <li key={item.id}>
            <Checkbox id={item.id} name={item.quantity} />
          </li>
        ))}
      </ul>
    </FilterType>
  );
}
