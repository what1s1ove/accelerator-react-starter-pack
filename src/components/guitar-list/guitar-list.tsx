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
      {guitars.map((guitar) => <GuitarCard guitar={guitar} key={guitar.id} commentCount={commentsCount[guitar.id - 1]} guitarRating={guitarsRating[guitar.id - 1]}/>)}
    </div>
  );
}

export default GuitarList;
