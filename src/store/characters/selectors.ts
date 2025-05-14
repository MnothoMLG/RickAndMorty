import { AppState } from '../root.reducer';

export const getAllCharacters = (app: AppState) =>
  app.characterReducer.characterList;
