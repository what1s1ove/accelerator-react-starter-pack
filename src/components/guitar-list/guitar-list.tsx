import GuitarCard from '../guitar-card/guitar-card';
import {Guitars} from '../../types/guitar';

type GuitarListProps = {
  guitars: Guitars,
  commentsCount: number[],
  guitarsRating: number[],
}

function GuitarList({guitars, commentsCount, guitarsRating}: GuitarListProps): JSX.Element {
  return (
    <div className="cards catalog__cards" data-testid="cards">
      {guitars.map((guitar, idx) => <GuitarCard guitar={guitar} key={guitar.id} commentCount={commentsCount[guitar.id - 1]} guitarRating={guitarsRating[idx]}/>)}
    </div>
  );
}

export default GuitarList;
