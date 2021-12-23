import { useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppRoute, FilterParams } from '../../const';
import { fetchFilteredGuitarsAction } from '../../store/api-action';
import { RootState } from '../../store/root-reducer';
import { getGuitars } from '../../store/selectors';
import { ThunkAppDispatch } from '../../types/action';
import { getMaxPrice, getMinPrice } from '../../utils';

const mapStateToProps = (state: RootState) => ({
  guitars: getGuitars(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onChangePriceFilter(searchParams: string) {
    dispatch(fetchFilteredGuitarsAction(searchParams));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function CatalogPriceFilter(props: PropsFromRedux): JSX.Element {
  const {onChangePriceFilter, guitars} = props;
  const history = useHistory();

  const minPrice = getMinPrice(guitars);
  const maxPrice = getMaxPrice(guitars);

  const priceMinRef = useRef<HTMLInputElement | null>(null);
  const priceMaxRef = useRef<HTMLInputElement | null>(null);

  const handlePriceInput = () => {
    let searchParams = '?';

    if (priceMinRef.current?.value) {
      searchParams += `${FilterParams.MinPrice}${priceMinRef.current?.value}&`;
    }
    if (priceMaxRef.current?.value) {
      searchParams += `${FilterParams.MaxPrice}${priceMaxRef.current?.value}&`;
    }

    history.push(AppRoute.Filter + searchParams);
    onChangePriceFilter(searchParams);
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="number"
            placeholder={minPrice.toString()}
            id="priceMin"
            name="от"
            min="0"
            ref={priceMinRef}
            onInput={handlePriceInput}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={maxPrice.toString()}
            id="priceMax"
            name="до"
            min="0"
            ref={priceMaxRef}
            onInput={handlePriceInput}
          />
        </div>
      </div>
    </fieldset>
  );
}

export {CatalogPriceFilter};
export default connector(CatalogPriceFilter);
