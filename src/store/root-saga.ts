import { all, spawn } from 'redux-saga/effects';
import catalogSaga from './catalog-slice/catalog-saga';

function* rootSaga(): Generator {
  const sagas = [ catalogSaga ];

  yield all(sagas.map((saga) => spawn(saga)));
}

export default rootSaga;
