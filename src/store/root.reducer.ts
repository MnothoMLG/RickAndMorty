import { combineReducers } from '@reduxjs/toolkit';
import { loadingReducer } from './loading/reducer';
import { characterReducer } from './characters/reducer';

export const reducers = combineReducers({
  loadingReducer,
  characterReducer,
});

export type AppState = ReturnType<typeof reducers>;
