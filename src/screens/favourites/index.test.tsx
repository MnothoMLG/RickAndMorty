import React, { useTransition } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Home from '../home';
import {
  fetchCharactersRequest,
  toggleFavouriteCharacter,
} from '@store/actions';
import {
  CharacterCard,
  CharacterCardPlaceholder,
} from '@components/characterCard';
import { TextInputProps } from 'react-native';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('@hooks', () => ({
  useLoading: jest.fn(() => false),
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('@components', () => {
  const { View, Text, TouchableOpacity, TextInput } = require('react-native'); // ✅ define inside mock
  return {
    Text: ({ children }: any) => <>{children}</>,
    AppButton: ({ onPress, label }: any) => (
      <TouchableOpacity onPress={onPress}>{label}</TouchableOpacity>
    ),
    Margin: ({ children }: any) => <>{children}</>,
    Center: ({ children }: any) => <>{children}</>,
    CharacterCard: ({ character, toggleFavorite, onPress }: any) => (
      <View>
        <Text>{character.name}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Text>Fav</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}></TouchableOpacity>
      </View>
    ),
    CharacterCardPlaceholder: () => <Text>Loading...</Text>,
    Input: ({ onChangeText, ...props }: TextInputProps) => (
      <TextInput
        data-testid='search-input'
        onChangeText={(value: string) => onChangeText?.(value)}
        {...props}
      />
    ),
    Padding: ({ children }: any) => <>{children}</>,
  };
});

describe('Home Screen', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    jest.clearAllMocks();
  });

  it('renders character cards when not loading', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue([
      { id: 1, name: 'Rick' },
      { id: 2, name: 'Morty' },
    ]);
    const { getByText } = render(<Home />);
    expect(getByText('Rick')).toBeTruthy();
    expect(getByText('Morty')).toBeTruthy();
  });

  it('dispatches fetchCharactersRequest on mount', () => {
    render(<Home />);
    expect(mockDispatch).toHaveBeenCalledWith(
      fetchCharactersRequest({ page: 1 })
    );
  });

  it('dispatches fetchMoreCharactersRequest on end reached', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue([
      { id: 1, name: 'Rick' },
    ]);
    const { getByTestId } = render(<Home />);
    // Simulate onEndReached
    fireEvent.scroll(getByTestId('Fav-FlatList'), {
      nativeEvent: {
        contentOffset: { y: 1000 },
        contentSize: { height: 2000 },
        layoutMeasurement: { height: 1000 },
      },
    });
    expect(mockDispatch).toHaveBeenCalledWith(
      fetchCharactersRequest({ page: 2 })
    );
  });

  it('dispatches toggleFavouriteCharacter when favorite button is pressed', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue([
      { id: 1, name: 'Rick' },
    ]);
    const { getByText } = render(<Home />);
    fireEvent.press(getByText('Fav'));
    expect(mockDispatch).toHaveBeenCalledWith(
      toggleFavouriteCharacter({
        character: {
          id: 1,
          name: 'Rick',
        },
      })
    );
  });

  it('navigates to details when character card is pressed', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue([
      { id: 1, name: 'Rick' },
    ]);
    const { getByText } = render(<Home />);
    fireEvent.press(getByText('Details'));
    expect(mockNavigate).toHaveBeenCalled();
  });

  it('shows empty state and refresh button when no results', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue([]);
    const { getByText } = render(<Home />);
    expect(getByText('common.noResults')).toBeTruthy();
    expect(getByText(' common.refresh ')).toBeTruthy();
  });

  it('dispatches fetchCharactersRequest when refresh button is pressed', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue([]);
    const { getByText } = render(<Home />);
    fireEvent.press(getByText('Refresh'));
    expect(mockDispatch).toHaveBeenCalledWith(
      fetchCharactersRequest({ page: 1 })
    );
  });

  it('dispatches fetchCharactersRequest with search on input', async () => {
    (useSelector as jest.Mock).mockReturnValue([{ id: 1, name: 'Rick' }]);
    const { getByTestId } = render(<Home />);
    fireEvent.changeText(getByTestId('search-input'), {
      target: { value: 'Summer' },
    });
    // Wait for debounce
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
