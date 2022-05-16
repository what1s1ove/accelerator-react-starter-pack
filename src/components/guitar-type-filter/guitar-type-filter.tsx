import { ChangeEventHandler } from 'react';
import { Checkbox } from '../checkbox/checkbox';
import { FilterType } from '../filter-type/filter-type';
import styles from './guitar-filter.module.css';

const guitars = [
  {id: 'acoustic', name: 'Акустические гитары'},
  {id: 'electric', name: 'Электрогитары'},
  {id: 'ukulele', name: 'Укулеле'},
];

export function GuitarTypeFilter(props: {
  onChange: ChangeEventHandler<HTMLInputElement>
  guitarsForChosenStrings: Array<string>
}) {
  return (
    <FilterType title="Тип гитар">
      <ul className={styles.list}>
        {guitars.map((item) => {
          const isDisabled = props.guitarsForChosenStrings.length > 0 ? !props.guitarsForChosenStrings.includes(item.id) : false;

          return (
            <li key={item.id}>
              <Checkbox
                onChange={props.onChange}
                id={item.id}
                label={item.name}
                type={item.id}
                disabled={isDisabled}
              />
            </li>
          );
        })}
      </ul>
    </FilterType>
  );
}
