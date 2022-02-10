import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGuitars } from '../../store/actions';
import { Guitar } from '../../types/shop-types';
import { FilterState, State } from '../../types/state';
import PriceFilter from './price-filter/price-filter';
import StringFilter from './string-filter/string-filter';
import TypeFilter from './type-filter/type-filter';

function CatalogFilter() {
  const dispatch = useDispatch();

  const guitars = useSelector<State, Guitar[]>((state) => state.guitars);
  const filterState = useSelector<State, FilterState>((state) => state.filterState);


  useEffect(() => {

    if (filterState.type.length !== 0) {
      let filteredGuitars = guitars.filter((guitar) => filterState.type.includes(guitar.type));
      if (filterState.currentStrings.length !== 0) {
        filteredGuitars = filteredGuitars.filter((guitar) => filterState.currentStrings.includes(guitar.stringCount));
      }
      if (filterState.price.length !== 0) {

        dispatch(updateGuitars(filteredGuitars.filter((guitar) => guitar.price >= filterState.price[0] && filterState.price[1] >= guitar.price)));

      } else {
        dispatch(updateGuitars(filteredGuitars));
      }
    } else {
      if (filterState.price.length !== 0) {

        dispatch(updateGuitars(guitars.filter((guitar) => guitar.price >= filterState.price[0] && filterState.price[1] >= guitar.price)));
      } else {
        dispatch(updateGuitars(guitars));

      }
    }

  }, [dispatch, filterState, guitars]);

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <PriceFilter />
      </fieldset>
      <TypeFilter />
      <StringFilter />
    </form>
  );
}

export default CatalogFilter;
