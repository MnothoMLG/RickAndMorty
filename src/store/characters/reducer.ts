import { createReducer } from '@reduxjs/toolkit';
import { fetchCharactersSuccess, toggleFavouriteCharacter } from './actions';
import { CharsState } from './types';
import { ICharacter } from '@constants/types';

const INITIAL_STATE: CharsState = {
  characterList: [],
  favourites: [],
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
  builder
    .addCase(fetchCharactersSuccess, standardCallBack)
    .addCase(
      toggleFavouriteCharacter,
      (
        state: CharsState,
        action: { type: string; payload: { character: ICharacter } }
      ) => {
        const { character } = action.payload;
        let favourites = [...state.favourites];
        if (character) {
          if (favourites.includes(character)) {
            favourites = [...favourites].filter(
              (char) => char.id !== character.id
            );
          } else {
            favourites = [...favourites, character];
          }
          return { ...state, favourites };
        }
      }
    );
});
