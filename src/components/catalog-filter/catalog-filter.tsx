/* eslint-disable no-console */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, filterGuitars, updateGuitars } from '../../store/actions';
import { Guitar } from '../../types/shop-types';
import { FilterState, State } from '../../types/state';

function CatalogFilter() {


  const guitars = useSelector<State, Guitar[]>((state) => state.guitars);
  const filteredGuitars = useSelector<State, Guitar[]>((state) => state.filteredGuitars);
  const filter = useSelector<State, FilterState>((state) => state.filter);

  const dispatch = useDispatch();


  useEffect(() => {

    // В случае если фильтер.акустик = true, мы берём из глобального состояния массив filteredGuitars(он изначально пустой), и записываем в него гитары
    // которые подходят под фильтр.акустик
    if (filter.acoustic) {
      dispatch(filterGuitars(filteredGuitars.concat(guitars.filter((guitar) => guitar.type === 'acoustic'))));
    } else {
      dispatch(filterGuitars(filteredGuitars.filter((guitar) => guitar.type !== 'acoustic')));
    }

    // Далее делаем всё тоже самое для остальных фильтров. Снова создаём условие if и вызываем массив filteredGuitars и если, допустим, у filter.electric условие true, то
    // мы также добавляем к массиву filteredGuitars гитары с фильтром electric

    if (!filter.acoustic && !filter.electric && !filter.fourStrings && !filter.sevenStrings && !filter.sixStrings && !filter.twelveStrings && !filter.ukulele) {
      dispatch(filterGuitars([]));
      dispatch(updateGuitars(guitars));
      return;

      // Если все фильтры = false, то мы передаём изначальный массив guitars, неотфильтрованный
    }

    // В противном случае мы передаём в состояние sortedGuitars массив, который мы сделали сверху с помощью множественных условных конструкций
    // После эти sortedGuitars рендерятся в компоненте main.tsx
    // Но по какой-то странной причине массив filteredGuitars не собирается выше.
    dispatch(updateGuitars(filteredGuitars));
  }, [dispatch, filter.acoustic, filter.electric, filter.fourStrings, filter.sevenStrings, filter.sixStrings, filter.twelveStrings, filter.ukulele, guitars]);


  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder="1 000" id="priceMin" name="от" />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder="30 000" id="priceMax" name="до" />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item" >
          <input className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            onChange={(evt) => {
              dispatch(changeFilter(evt.currentTarget.checked ? { ...filter, acoustic: true } : { ...filter, acoustic: false }));
            }}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            onClick={(evt) => dispatch(changeFilter(evt.currentTarget.checked ? { ...filter, electric: true } : { ...filter, electric: false }))}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            onClick={(evt) => dispatch(changeFilter(evt.currentTarget.checked ? { ...filter, ukulele: true } : { ...filter, ukulele: false }))}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox"
            id="4-strings"
            name="4-strings"
            onClick={(evt) => dispatch(changeFilter(evt.currentTarget.checked ? { ...filter, fourStrings: true } : { ...filter, fourStrings: false }))}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            onClick={(evt) => dispatch(changeFilter(evt.currentTarget.checked ? { ...filter, sixStrings: true } : { ...filter, sixStrings: false }))}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            onClick={(evt) => dispatch(changeFilter(evt.currentTarget.checked ? { ...filter, sevenStrings: true } : { ...filter, sevenStrings: false }))}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            onClick={(evt) => dispatch(changeFilter(evt.currentTarget.checked ? { ...filter, twelveStrings: true } : { ...filter, twelveStrings: false }))}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default CatalogFilter;
