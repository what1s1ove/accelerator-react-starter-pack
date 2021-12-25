import Filter from './filter/filter';
import Sort from './sort/sort';
import {useSelector} from 'react-redux';
import {getGuitarsList, getSortByIncrease, getSortByType} from '../../store/main-data/selectors';
import GuitarCardsList from '../guitar-cards-list/guitar-cards-list';
import {getSortedGuitarsList} from '../../const/const';


function Catalog ():JSX.Element {
  const guitarsList = useSelector(getGuitarsList);
  const currentSortByType = useSelector(getSortByType);
  const currentSortByIncrease = useSelector(getSortByIncrease);
  const sortedGuitarsList = getSortedGuitarsList(guitarsList, currentSortByType, currentSortByIncrease);

  return (
    <div className="catalog">
      <Filter />
      <Sort
        currentSortByType={currentSortByType}
        currentSortByIncrease={currentSortByIncrease}
      />
      <GuitarCardsList guitarsList={sortedGuitarsList}/>
    </div>
  );
}
export default Catalog;
