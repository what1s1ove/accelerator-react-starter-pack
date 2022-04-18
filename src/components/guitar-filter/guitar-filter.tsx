import { Checkbox } from '../checkbox/checkbox';
import { FilterType } from '../filter-type/filter-type';
import styles from './guitar-filter.module.css';

const guitars = [
  {id: 'acoustic', name: 'Акустические гитары'},
  {id: 'electro', name: 'Электрогитары'},
  {id: 'ukulele', name: 'Укулеле'},
];

export function GuitarFilter() {
  return (
    <FilterType title="Тип гитар">
      <ul className={styles.list}>
        {guitars.map((item) => (
          <li key={item.id}>
            <Checkbox id={item.id} name={item.name} />
          </li>
        ))}
      </ul>
    </FilterType>
  );
}
