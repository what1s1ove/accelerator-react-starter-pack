import Filter from './filter/filter';
import Sort from './sort/sort';
import {useSelector} from 'react-redux';
import {getGuitarsList} from '../../store/main-data/selectors';
import GuitarCardsList from '../guitar-cards-list/guitar-cards-list';

function Catalog ():JSX.Element {
  const guitarsList = useSelector(getGuitarsList);
  return (
    <div className="catalog">
      <Filter />
      <Sort />
      <GuitarCardsList guitarsList={guitarsList}/>
    </div>
  );
}
export default Catalog;
