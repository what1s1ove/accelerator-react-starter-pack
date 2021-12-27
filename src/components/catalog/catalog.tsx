import Filter from './filter/filter';
import Sort from './sort/sort';
import GuitarCardsList from '../guitar-cards-list/guitar-cards-list';
import {useFetchGuitarsListQuery} from '../../service/api';
import {useState} from 'react';


function Catalog ():JSX.Element {
  const limit = 9;
  const [sort, setSort] = useState<string | undefined>('');
  const [order, setOrder] = useState<string | undefined>('');
  const {data: guitarsList, isLoading} = useFetchGuitarsListQuery({
    limit,
    sort,
    order,
  });

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      <div className="catalog">
        <Filter />
        <Sort onSortChange={setSort} onOrderChange={setOrder}/>
        <GuitarCardsList guitarsList={guitarsList} />
      </div>
    </>
  );
}
export default Catalog;
