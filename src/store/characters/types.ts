import { ICharacter } from '@constants/types';

export interface CharsState {
  characterList: Array<ICharacter>;
  favourites: Array<ICharacter>;
}

export interface IFetchResult {
  info: {
    count: number;
    pages: number;
    next?: string;
    prev?: string;
  };
  results: Array<ICharacter>;
}
