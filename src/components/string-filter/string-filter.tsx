import { ChangeEventHandler } from 'react';
import { Checkbox } from '../checkbox/checkbox';
import { FilterType } from '../filter-type/filter-type';
import styles from './string-filter.module.css';

const strings = [
  {id: 'four', quantity: 4},
  {id: 'six', quantity: 6},
  {id: 'seven', quantity: 7},
  {id: 'twelve', quantity: 12},
];

export function StringFilter(props: {
  onChange: ChangeEventHandler<HTMLInputElement>
  stringsForChosenGuitars: Array<number>
}) {
  return (
    <FilterType title="Количество струн">
      <ul className={styles.list}>
        {strings.map((item) => {
          const isDisabled = props.stringsForChosenGuitars.length > 0 ? !props.stringsForChosenGuitars.includes(item.quantity) : false;
          return (
            <li key={item.id}>
              <Checkbox
                onChange={props.onChange}
                id={item.id}
                label={item.quantity}
                strings={item.quantity}
                disabled={isDisabled}
              />
            </li>);
        })}
      </ul>
    </FilterType>
  );
}
