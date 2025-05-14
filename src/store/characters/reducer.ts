import { createReducer } from '@reduxjs/toolkit';
import { fetchCharactersSuccess } from './actions';
import { CharsState } from './types';

const INITIAL_STATE: CharsState = {
  characterList: [],
};

const standardCallBack = (
  state: CharsState,
  action: { type: string; payload: Partial<CharsState> }
) => {
  if (action.payload) {
    return { ...state, ...action.payload };
  }
};

export const characterReducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(fetchCharactersSuccess, standardCallBack);
});
