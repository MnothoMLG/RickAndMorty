import { ICharacter } from '@constants/types';
import { createAction } from '@reduxjs/toolkit';
import { CharsState, IFetchPayload } from './types';

// ===== GET LIST OF CHARACTERS

export const GET_CHARACTERS_LOADING_KEY = '@DATA/GET_ALL_CHARACTERS';
export const fetchCharactersRequest = createAction<IFetchPayload>(
  '@DATA/GET_ALL_CHARACTERS_API_REQUEST'
);

export const fetchCharactersSuccess = createAction<Partial<CharsState>>(
  '@DATA/GET_ALL_CHARACTERS_API_SUCCESS'
);
export const fetchCharactersError = createAction<{
  error: string;
}>('@DATA/GET_ALL_CHARACTERS_API_ERROR');

// Load more characters
export const GET_MORE_CHARACTERS_LOADING_KEY = '@DATA/GET_MORE_CHARACTERS';
export const fetchMoreCharactersRequest = createAction<IFetchPayload>(
  '@DATA/GET_MORE_CHARACTERS_API_REQUEST'
);

export const fetchMoreCharactersSuccess = createAction<Partial<CharsState>>(
  '@DATA/GET_MORE_CHARACTERS_API_SUCCESS'
);
export const fetchMoreCharactersError = createAction<{
  error: string;
}>('DATA/GET_MORE_CHARACTERS_API_ERROR');

export const toggleFavouriteCharacter = createAction<{
  character: ICharacter;
}>('@DATA/TOGGLE_FAVOURITE');
