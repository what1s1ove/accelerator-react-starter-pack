import IGuitar from 'models/guitar';
import { call, takeEvery, put } from 'redux-saga/effects';
import { fetchGuitars } from './catalog-api';
import { loadGuitars, loadGuitarsFail, loadGuitarsSuccess } from './catalog-slice';

function* workoutLoadGuitars(): Generator<
  unknown,
  void,
  IGuitar[]
  > {
  try {
    const guitars: IGuitar[] = yield call(fetchGuitars, true);

    yield put(loadGuitarsSuccess({ guitars }));
  } catch (error) {
    yield put(loadGuitarsFail());
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

function* catalogSaga(): Generator {
  yield takeEvery(loadGuitars, workoutLoadGuitars);
}

export default catalogSaga;
