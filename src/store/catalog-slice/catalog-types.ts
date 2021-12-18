import IGuitar from 'models/guitar';

interface ICatalogState {
  guitars: IGuitar[];
  guitarsLoading: boolean,
}

export type LoadGuitarSuccessType = {
  guitars: IGuitar[],
}

export default ICatalogState;
