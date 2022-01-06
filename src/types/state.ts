import { Guitar } from './shop-types';

type State = {
  guitars: Guitar[],
  sortedGuitars: Guitar[],
  filteredGuitars: Guitar[],
  filter: FilterState
}

type FilterState = {
  acoustic: boolean,
  electric: boolean,
  ukulele: boolean,
  fourStrings: boolean,
  sixStrings: boolean,
  sevenStrings: boolean,
  twelveStrings: boolean,
}

export type { State, FilterState };
