import Header from '../header/header';
import Footer from '../footer/footer';
import GuitarList from '../guitar-list/guitar-list';
import {useDispatch, useSelector} from 'react-redux';
import {getGuitars, getPage} from '../../store/guitars-data/selectors';
import {getGuitarsRating} from '../../store/guitars-data/selectors';
import {getCommentsCount, getFilterPrice, getFilterString, getFilterType, getSortDirection, getSortTitle} from '../../store/guitars-other-data/selectors';
import {ChangeEvent, FocusEvent, MouseEvent, useEffect, useState} from 'react';
import {changeFilterPrice, changeFilterString, changeFilterType, changePage, changeSortDirection, changeSortTitle, loadGuitarsRating} from '../../store/action';
import {useHistory} from 'react-router-dom';
import {fetchCommentsCountAction} from '../../store/api-actions';

function Main(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const commentsCount = useSelector(getCommentsCount);
  const guitarsRating = useSelector(getGuitarsRating);
  const page = useSelector(getPage);
  const sortTitle = useSelector(getSortTitle);
  const sortDirection = useSelector(getSortDirection);
  const filterPrice = useSelector(getFilterPrice);
  const filterType = useSelector(getFilterType);
  const filterString = useSelector(getFilterString);

  const dispatch = useDispatch();
  const history = useHistory();

  const sortedByPriceGuitars = [...guitars];
  sortedByPriceGuitars.sort((guitar1, guitar2) => guitar1.price - guitar2.price);

  const [filteredByPriceGuitars, setFilteredByPriceGuitars] = useState(guitars);
  const [filteredByTypeGuitars, setFilteredByTypeGuitars] = useState(filteredByPriceGuitars);
  const [filteredGuitars, setFilteredGuitars] = useState(filteredByTypeGuitars);
  const [sortedGuitars, setSortedGuitars] = useState(filteredGuitars);
  const [pagedGuitars, setPagedGuitars] = useState(sortedGuitars);
  const [isDisabledString4, setIsDisabledString4] = useState(false);
  const [isDisabledString6, setIsDisabledString6] = useState(false);
  const [isDisabledString7, setIsDisabledString7] = useState(false);
  const [isDisabledString12, setIsDisabledString12] = useState(false);

  const sortTitleHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if (evt.currentTarget.textContent) {
      if (sortDirection === '') {
        dispatch(changeSortDirection('По возрастанию'));
      }
      dispatch(changeSortTitle(evt.currentTarget.textContent));
    }
  };

  const sortDirectionHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if (sortTitle === '') {
      dispatch(changeSortTitle('по цене'));
    }
    dispatch(changeSortDirection(evt.currentTarget.ariaLabel));
  };

  const priceBlurHandler = (evt: FocusEvent<HTMLInputElement>) => {
    if (evt.currentTarget.value !== '') {
      let price = Number(evt.currentTarget.value);
      if (price > sortedByPriceGuitars[sortedByPriceGuitars.length - 1].price) {
        price = sortedByPriceGuitars[sortedByPriceGuitars.length - 1].price;
      } else if (price < sortedByPriceGuitars[0].price) {
        price = sortedByPriceGuitars[0].price;
      }
      dispatch(changeFilterPrice({
        ...filterPrice,
        [evt.currentTarget.id]: String(price),
      }));
    }
  };

  const priceChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilterPrice({
      ...filterPrice,
      [evt.currentTarget.id]: evt.currentTarget.value,
    }));
  };

  const stringChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilterString({
      ...filterString,
      [evt.currentTarget.name]: evt.currentTarget.checked ? evt.currentTarget.name : '',
    }));
  };

  const typeChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilterType({
      ...filterType,
      [evt.currentTarget.name]: evt.currentTarget.checked ? evt.currentTarget.name : '',
    }));
  };

  const pageClickHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if (evt.currentTarget.textContent === 'Далее') {
      dispatch(changePage(page + 1));
    } else if (evt.currentTarget.textContent === 'Назад') {
      dispatch(changePage(page - 1));
    } else {
      dispatch(changePage(Number(evt.currentTarget.textContent)));
    }
  };

  useEffect(() => {
    let tempPagedGuitars = [...sortedGuitars];
    const pagesArray = [...new Array(Math.ceil(sortedGuitars.length / 9))].map((_, idx) => idx + 1);
    for (const item of pagesArray) {
      if (page === item) {
        tempPagedGuitars = sortedGuitars.slice(item * 9 - 9, item * 9);
      }
    }
    history.push(`/page-${page}/prices:${Object.values(filterPrice).join(',')};types:${Object.values(filterType).join(',')};strings:${Object.values(filterString).join(',')}`);
    setPagedGuitars(tempPagedGuitars);
    dispatch(fetchCommentsCountAction(sortedGuitars));
    const tempGuitarsRating = tempPagedGuitars.map((guitar) => guitar.rating);
    dispatch(loadGuitarsRating(tempGuitarsRating));
  }, [sortedGuitars, page, filterPrice, filterType, filterString, history, dispatch]);

  useEffect(() => {
    const tempSortedGuitars = [...filteredGuitars];
    if (sortTitle === 'по популярности' && sortDirection === 'По возрастанию') {
      tempSortedGuitars.sort((guitar1, guitar2) => guitar1.rating - guitar2.rating);
    } else if (sortTitle === 'по популярности' && sortDirection === 'По убыванию') {
      tempSortedGuitars.sort((guitar1, guitar2) => guitar2.rating - guitar1.rating);
    } else if (sortTitle === 'по цене'  && sortDirection === 'По возрастанию') {
      tempSortedGuitars.sort((guitar1, guitar2) => guitar1.price - guitar2.price);
    } else if (sortTitle === 'по цене' && sortDirection === 'По убыванию') {
      tempSortedGuitars.sort((guitar1, guitar2) => guitar2.price - guitar1.price);
    } else if (sortTitle === 'по популярности' && sortDirection === '') {
      tempSortedGuitars.sort((guitar1, guitar2) => guitar1.rating - guitar2.rating);
    } else if (sortTitle === 'по цене'  && sortDirection === '') {
      tempSortedGuitars.sort((guitar1, guitar2) => guitar1.price - guitar2.price);
    } else if (sortTitle === '' && sortDirection === 'По возрастанию') {
      tempSortedGuitars.sort((guitar1, guitar2) => guitar1.price - guitar2.price);
    } else if (sortTitle === '' && sortDirection === 'По убыванию') {
      tempSortedGuitars.sort((guitar1, guitar2) => guitar2.price - guitar1.price);
    }
    setSortedGuitars(tempSortedGuitars);
  }, [filteredGuitars, sortTitle, sortDirection]);

  useEffect(() => {
    let tempFilteredGuitars = [...guitars];
    if (filterPrice.priceMin !== '' && filterPrice.priceMax !== '') {
      tempFilteredGuitars = guitars.filter((guitar) => guitar.price >= Number(filterPrice.priceMin) && guitar.price <= Number(filterPrice.priceMax));
    } else if (filterPrice.priceMin !== '') {
      tempFilteredGuitars = guitars.filter((guitar) => guitar.price >= Number(filterPrice.priceMin));
    } else if (filterPrice.priceMax !== '') {
      tempFilteredGuitars = guitars.filter((guitar) => guitar.price <= Number(filterPrice.priceMax));
    }
    dispatch(changePage(1));
    setFilteredByPriceGuitars(tempFilteredGuitars);
  }, [guitars, filterPrice, dispatch]);

  useEffect(() => {
    let tempFilteredGuitars = [...filteredByPriceGuitars];
    if (filterType.acoustic === '' && filterType.electric === '' && filterType.ukulele === '') {
      setIsDisabledString4(false);
      setIsDisabledString6(false);
      setIsDisabledString7(false);
      setIsDisabledString12(false);
    } else {
      tempFilteredGuitars = filteredByPriceGuitars.filter((guitar) => guitar.type === filterType.acoustic || guitar.type === filterType.electric || guitar.type === filterType.ukulele);
      setIsDisabledString4(filterType.ukulele === '' ? filterType.electric === '' : false);
      setIsDisabledString6(filterType.electric === '' ? filterType.acoustic === '' : false);
      setIsDisabledString7(filterType.electric === '' ? filterType.acoustic === '' : false);
      setIsDisabledString12(filterType.acoustic === '');
    }
    dispatch(changePage(1));
    setFilteredByTypeGuitars(tempFilteredGuitars);
  }, [filteredByPriceGuitars, filterType, dispatch]);

  useEffect(() => {
    let tempFilteredGuitars = [...filteredByTypeGuitars];
    if (!(filterString['4-strings'] === '' && filterString['6-strings'] === '' && filterString['7-strings'] === '' && filterString['12-strings'] === '')) {
      tempFilteredGuitars = filteredByTypeGuitars.filter((guitar) => `${guitar.stringCount}-strings` === filterString['4-strings'] || `${guitar.stringCount}-strings` === filterString['6-strings'] || `${guitar.stringCount}-strings` === filterString['7-strings'] || `${guitar.stringCount}-strings` === filterString['12-strings']);
    }
    dispatch(changePage(1));
    setFilteredGuitars(tempFilteredGuitars);
  }, [filteredByTypeGuitars, filterString, dispatch]);

  return (
    <div className="wrapper">

      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
            </li>
            <li className="breadcrumbs__item"><a className="link" href="/" aria-disabled>Каталог</a>
            </li>
          </ul>
          <div className="catalog">
            <form className="catalog-filter">
              <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Цена, ₽</legend>
                <div className="catalog-filter__price-range">
                  <div className="form-input">
                    <label className="visually-hidden">Минимальная цена</label>
                    <input
                      type="number"
                      placeholder={sortedByPriceGuitars[0] ? String(sortedByPriceGuitars[0].price) : ''}
                      id="priceMin"
                      name="от"
                      min={sortedByPriceGuitars[0] ? String(sortedByPriceGuitars[0].price) : ''}
                      max={sortedByPriceGuitars[0] ? String(sortedByPriceGuitars[sortedByPriceGuitars.length - 1].price) : ''}
                      value={filterPrice.priceMin}
                      onBlur={priceBlurHandler}
                      onChange={priceChangeHandler}
                      data-testid="priceMin"
                    />
                  </div>
                  <div className="form-input">
                    <label className="visually-hidden">Максимальная цена</label>
                    <input
                      type="number"
                      placeholder={sortedByPriceGuitars[0] ? String(sortedByPriceGuitars[sortedByPriceGuitars.length - 1].price) : ''}
                      id="priceMax"
                      name="до"
                      min={sortedByPriceGuitars[0] ? String(sortedByPriceGuitars[0].price) : ''}
                      max={sortedByPriceGuitars[0] ? String(sortedByPriceGuitars[sortedByPriceGuitars.length - 1].price) : ''}
                      value={filterPrice.priceMax}
                      onBlur={priceBlurHandler}
                      onChange={priceChangeHandler}
                      data-testid="priceMax"
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Тип гитар</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="acoustic"
                    name="acoustic"
                    onChange={typeChangeHandler}
                    checked={filterType.acoustic !== ''}
                  />
                  <label htmlFor="acoustic">Акустические гитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="electric"
                    name="electric"
                    onChange={typeChangeHandler}
                    checked={filterType.electric !== ''}
                  />
                  <label htmlFor="electric">Электрогитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="ukulele"
                    name="ukulele"
                    onChange={typeChangeHandler}
                    checked={filterType.ukulele !== ''}
                  />
                  <label htmlFor="ukulele">Укулеле</label>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Количество струн</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="4-strings"
                    name="4-strings"
                    onChange={stringChangeHandler}
                    checked={filterString['4-strings'] !== ''}
                    disabled={isDisabledString4}
                  />
                  <label htmlFor="4-strings">4</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="6-strings"
                    name="6-strings"
                    onChange={stringChangeHandler}
                    checked={filterString['6-strings'] !== ''}
                    disabled={isDisabledString6}
                  />
                  <label htmlFor="6-strings">6</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="7-strings"
                    name="7-strings"
                    onChange={stringChangeHandler}
                    checked={filterString['7-strings'] !== ''}
                    disabled={isDisabledString7}
                  />
                  <label htmlFor="7-strings">7</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="12-strings"
                    name="12-strings"
                    onChange={stringChangeHandler}
                    checked={filterString['12-strings'] !== ''}
                    disabled={isDisabledString12}
                  />
                  <label htmlFor="12-strings">12</label>
                </div>
              </fieldset>
            </form>
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button className={`catalog-sort__type-button${sortTitle === 'по цене' ? ' catalog-sort__type-button--active' : ''}`} aria-label="по цене" tabIndex={-1} onClick={sortTitleHandler}>по цене</button>
                <button className={`catalog-sort__type-button${sortTitle === 'по популярности' ? ' catalog-sort__type-button--active' : ''}`} aria-label="по популярности" onClick={sortTitleHandler}>по популярности</button>
              </div>
              <div className="catalog-sort__order">
                <button className={`catalog-sort__order-button catalog-sort__order-button--up${sortDirection === 'По возрастанию' ? ' catalog-sort__order-button--active' : ''}`} aria-label="По возрастанию" tabIndex={-1} onClick={sortDirectionHandler}></button>
                <button className={`catalog-sort__order-button catalog-sort__order-button--down${sortDirection === 'По убыванию' ? ' catalog-sort__order-button--active' : ''}`} aria-label="По убыванию" onClick={sortDirectionHandler}></button>
              </div>
            </div>

            <GuitarList guitars={pagedGuitars} commentsCount={commentsCount} guitarsRating={guitarsRating}/>

            <div className="pagination page-content__pagination">
              <ul className="pagination__list">
                {page === 1 ? '' :
                  <li className="pagination__page pagination__page--prev" id="prev">
                    <a className="link pagination__page-link" href="1" onClick={pageClickHandler}>Назад</a>
                  </li>}
                {[...new Array(Math.ceil(sortedGuitars.length / 9))].map((_, idx) => idx + 1).map((item, idx) =>
                  (
                    <li className={`pagination__page ${page === (idx + 1)  ? 'pagination__page--active' : ''}`} key={item}>
                      <a className="link pagination__page-link" href="1" onClick={pageClickHandler}>{idx + 1}</a>
                    </li>
                  ))}
                {page === Math.ceil(sortedGuitars.length / 9) ? '' :
                  <li className="pagination__page pagination__page--next" id="next">
                    <a className="link pagination__page-link" href="3" onClick={pageClickHandler}>Далее</a>
                  </li>}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />

    </div>
  );
}

export default Main;
