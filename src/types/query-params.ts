import { QueryParam } from '../constants/query-param';
import { SortingType, SortingOrder } from '../constants/sorting';

export type QueryParametersType = {
  [QueryParam.Sort]?: typeof SortingType.Price | typeof SortingType.Rating,
  [QueryParam.Order]?: typeof SortingOrder.Asc | typeof SortingOrder.Desc,
}
