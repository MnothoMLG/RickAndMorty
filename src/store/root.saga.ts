import { all } from 'redux-saga/effects';
import { watchCharacterSagas } from './characters/sagas';
export default function* sagas() {
  yield all([watchCharacterSagas()]);
}
