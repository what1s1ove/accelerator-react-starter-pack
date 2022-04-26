import { QueryParams } from '../constants/query-params';
import { SortingType, SortingOrder } from '../constants/sorting';

export type QueryParametersType = {
  [QueryParams.Sort]?: typeof SortingType.Price | typeof SortingType.Rating,
  [QueryParams.Order]?: typeof SortingOrder.Asc | typeof SortingOrder.Desc,
}
