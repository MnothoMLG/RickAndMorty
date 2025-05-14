import { AxiosResponse } from 'axios';
import { takeLatest, put, call, delay } from 'redux-saga/effects';
import {
  fetchCharactersError,
  fetchCharactersRequest,
  fetchCharactersSuccess,
} from './actions';
import { EToastTypes } from '@constants/types';
import { client } from '@api';
import { CHARACTERS } from '@api/queries';
import { showToast } from '@util';
import { IFetchResult } from './types';

export function* fetchCharacters({}: { type: string }) {
  try {
    console.log('fetchCharacters saga', process.env.BASE_URL);
    const response: AxiosResponse<IFetchResult> = yield call(() =>
      client.get(CHARACTERS)
    );

    console.log('response', response);

    yield delay(2000); //so you see loaders :]
    yield put(
      fetchCharactersSuccess({
        characterList: response.data.results,
      })
    );
  } catch (err) {
    console.log('error', err);
    showToast({
      type: EToastTypes.ERROR,
      message: 'An error occurred fetching data',
    });
    yield put(
      fetchCharactersError({ err: 'An error occured getting products data' })
    );
  }
}

export function* watchCharacterSagas() {
  yield takeLatest(fetchCharactersRequest.type, fetchCharacters);
}
