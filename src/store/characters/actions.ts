import { ICharacter } from '@constants/types';
import { createAction } from '@reduxjs/toolkit';

// ===== GET LIST OF CHARACTERS

export const GET_LOAN_APPLICATIONS_LOADING_KEY = '@DATA/GET_ALL_CHARACTERS';
export const fetchCharactersRequest = createAction(
  '@DATA/GET_ALL_CHARACTERS_API_REQUEST'
);
export const fetchCharactersSuccess = createAction<{
  characterList: ICharacter[];
}>('@DATA/GET_ALL_CHARACTERS_API_SUCCESS');
export const fetchCharactersError = createAction<{
  error: string;
}>('@DATA/GET_ALL_CHARACTERS_API_ERROR');
