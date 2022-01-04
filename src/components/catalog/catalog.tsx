import Filter from './filter/filter';
import Sort from './sort/sort';
import GuitarCardsList from '../guitar-cards-list/guitar-cards-list';
import {
  useFetchGuitarsListQuery
} from '../../service/api';
import {useEffect, useState} from 'react';
import useDebounce from '../../hooks/useDebounce';
import {useHistory, useLocation} from 'react-router-dom';

export type Type = {
  acoustic?: string;
  electric?: string;
  ukulele?: string;
}

export type StringCount = {
  fourStrings?: string;
  sixStrings?: string;
  sevenStrings?: string;
  twelveStrings?: string;
}
type ViewState = {
  sort?: string;
  order?: string;
  type?: string;
  stringCount?: string;
}

function Catalog ():JSX.Element {
  const history = useHistory();
  const location = useLocation<string>();
  const urlQueryParams = location.search;

  const parseViewState = () => {
    const viewState = new URLSearchParams(urlQueryParams).entries();
    return Object.fromEntries(viewState);
  };

  const stringifyViewState = (viewState: {[p: string]: string}) => new URLSearchParams(viewState).toString();

  const changeURL = (updatedViewState: {[p: string]: string}) => {
    const newLocation = {...location, pathname:'/guitars', search: stringifyViewState(updatedViewState)};
    history.push(newLocation);
  };

  const viewState:ViewState = parseViewState();

  const limit = 9;
  const [stateSort, setStateSort] = useState<string | undefined>('');
  const [stateOrder, setStateOrder] = useState<string | undefined>('');
  const [stateType, setStateType] = useState<Type>({acoustic: '', electric: '', ukulele: ''});
  const [stateStringCount, setStateStringCount] = useState<StringCount>({fourStrings: '', sixStrings: '', sevenStrings: '', twelveStrings: ''});
  const [statePriceMin, setStatePriceMin] = useState<string | number | undefined>();
  const [statePriceMax, setStatePriceMax] = useState<string | number |undefined>();
  const debouncedMinPrice = useDebounce(statePriceMin, 500);
  const debouncedMaxPrice = useDebounce(statePriceMax, 500);
  const [min, setMin] = useState(debouncedMinPrice);
  const [max, setMax] = useState(debouncedMaxPrice);
  // eslint-disable-next-line no-console
  console.log(stateSort, stateOrder, min, max);

  useEffect(() => {
    setMax(debouncedMaxPrice);
    setMin(debouncedMinPrice);
  }, [debouncedMinPrice, debouncedMaxPrice]);

  const {data: guitarsList, isLoading} = useFetchGuitarsListQuery({limit, sort: viewState.sort, order: viewState.order, type: viewState.type, stringCount: viewState.stringCount});

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      <div className="catalog">
        <Filter
          stateType={stateType}
          stateStringCount={stateStringCount}
          statePriceMin={statePriceMin}
          statePriceMax={statePriceMax}
          onStateTypeChange={setStateType}
          onStateStringCountChange={setStateStringCount}
          onStateMinPriceChange={setStatePriceMin}
          onStateMaxPriceChange={setStatePriceMax}
          viewState={viewState}
          changeURL={changeURL}
        />
        <Sort
          onStateSortChange={setStateSort}
          onStateOrderChange={setStateOrder}
          viewState={viewState}
          changeURL={changeURL}
        />
        <GuitarCardsList guitarsList={guitarsList} />
      </div>
    </>
  );
}
export default Catalog;
