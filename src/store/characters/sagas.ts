import { AxiosResponse } from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import {
  fetchCharactersError,
  fetchCharactersRequest,
  fetchCharactersSuccess,
  fetchMoreCharactersError,
  fetchMoreCharactersRequest,
  fetchMoreCharactersSuccess,
} from './actions';
import { EToastTypes } from '@constants/types';
import { client } from '@api';
import { CHARACTERS } from '@api/queries';
import { showToast } from '@util';
import { IAction, IFetchPayload, IFetchResult } from './types';

export function* fetchCharacters({ payload, type }: IAction<IFetchPayload>) {
  const { page = 1, search = '' } = payload;
  try {
    const response: AxiosResponse<IFetchResult> = yield call(() =>
      client.get(CHARACTERS, {
        params: {
          page,
          ...(search ? { name: search } : {}),
        },
      })
    );

    if (type === fetchMoreCharactersRequest.type) {
      yield put(
        fetchMoreCharactersSuccess({
          characterList: response.data.results,
          info: response.data.info,
        })
      );
    } else {
      yield put(
        fetchCharactersSuccess({
          characterList: response.data.results,
          info: response.data.info,
        })
      );
    }
  } catch (error) {
    showToast({
      type: EToastTypes.ERROR,
      message: 'Sorry, we could not find what you are looking for',
    });

    yield put(fetchCharactersError({ error: 'An error occured getting data' }));
    if (type === fetchMoreCharactersRequest.type) {
      yield put(
        fetchMoreCharactersError({
          error: 'An error occurred', //fix typescript
        })
      );
    }
  }
}

export function* watchCharacterSagas() {
  yield takeLatest(fetchCharactersRequest.type, fetchCharacters);
  yield takeLatest(fetchMoreCharactersRequest.type, fetchCharacters);
}
