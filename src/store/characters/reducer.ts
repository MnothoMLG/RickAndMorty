import { createReducer } from '@reduxjs/toolkit';
import {
  fetchCharactersSuccess,
  fetchMoreCharactersSuccess,
  toggleFavouriteCharacter,
} from './actions';
import { CharsState } from './types';
import { EToastTypes, ICharacter } from '@constants/types';
import { showToast } from '@util';

const INITIAL_STATE: CharsState = {
  characterList: [],
  favourites: [],
  info: {
    count: 0,
    pages: 0,
  },
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
      fetchMoreCharactersSuccess,
      (
        state: CharsState,
        action: { type: string; payload: Partial<CharsState> }
      ) => {
        const { characterList } = action.payload;

        if (characterList?.length) {
          return {
            ...state,
            characterList: [...state.characterList, ...characterList],
          };
        }
      }
    )
    .addCase(
      toggleFavouriteCharacter,
      (
        state: CharsState,
        action: { type: string; payload: { character: ICharacter } }
      ) => {
        const { character } = action.payload;
        let favourites = [...state.favourites];
        if (character) {
          if (favourites.some((char) => char.id == character.id)) {
            favourites = [...favourites].filter(
              (char) => char.id !== character.id
            );
          } else {
            favourites = [...favourites, character];
            showToast({
              type: EToastTypes.SUCCESS,
              message: 'Added to favs :]',
            });
          }
          return { ...state, favourites };
        }
      }
    );
});
