import { isFavourite } from './index';
import { ICharacter } from '@constants/types';

describe('isFavourite', () => {
  const character1: ICharacter = {
    id: 1,
    name: 'Rick',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: '', url: '' },
    location: { name: '', url: '' },
    image: '',
    episode: [],
    url: '',
    created: '',
  };
  const character2: ICharacter = {
    id: 2,
    name: 'Morty',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: '', url: '' },
    location: { name: '', url: '' },
    image: '',
    episode: [],
    url: '',
    created: '',
  };
  const character3: ICharacter = {
    id: 3,
    name: 'Summer',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Female',
    origin: { name: '', url: '' },
    location: { name: '', url: '' },
    image: '',
    episode: [],
    url: '',
    created: '',
  };

  it('returns true if character is in favourites', () => {
    const favourites = [character1, character2];
    expect(isFavourite(character1, favourites)).toBe(true);
    expect(isFavourite(character2, favourites)).toBe(true);
  });

  it('returns false if character is not in favourites', () => {
    const favourites = [character1, character2];
    expect(isFavourite(character3, favourites)).toBe(false);
  });

  it('returns false if favourites is empty', () => {
    const favourites: ICharacter[] = [];
    expect(isFavourite(character1, favourites)).toBe(false);
  });

  it('returns false if character id does not match any in favourites', () => {
    const anotherCharacter: ICharacter = { ...character1, id: 99 };
    const favourites = [character1, character2];
    expect(isFavourite(anotherCharacter, favourites)).toBe(false);
  });
});
