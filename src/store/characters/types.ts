import { ICharacter } from '@constants/types';

export interface CharsState {
  characterList: Array<ICharacter>;
  favourites: Array<ICharacter>;
  info?: Info;
}

export interface Info {
  count: number;
  pages: number;
  next?: string;
  prev?: string;
}

export interface IFetchResult {
  info: Info;
  results: Array<ICharacter>;
}

export interface IFetchPayload {
  page: number;
  search?: string;
}

export interface IAction<T> {
  type: string;
  payload: T;
}
