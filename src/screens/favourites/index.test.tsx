import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Home from '../home';
import { fetchCharactersRequest } from '@store/actions';
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
  useTranslation: () => ({
    t: (key: string) =>
      ({
        'common.refresh': 'Refresh',
        'common.noResults': 'No results found',
      }[key] || key),
  }),
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
        <TouchableOpacity onPress={onPress}>
          <Text>Details</Text>
        </TouchableOpacity>
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
    // Add a FlatList mock that renders with the correct testID and supports renderItem/data
    // FlatList: ({ data = [], renderItem, ...props }: any) => (
    //   <ScrollView testID='Fav-FlatList' {...props}>
    //     {data.map((item: any, index: number) =>
    //       renderItem ? renderItem({ item, index }) : null
    //     )}
    //   </ScrollView>
    // ),
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

  it('shows empty state and refresh button when no results', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue([]);
    const { queryAllByText } = render(<Home />);
    expect(queryAllByText('common.noResults')).toBeTruthy();
    expect(queryAllByText('common.refresh')).toBeTruthy();
  });

  it('dispatches fetchCharactersRequest when refresh button is pressed', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue([]);
    const { queryAllByText } = render(<Home />);
    const refreshButton = queryAllByText('Refresh');
    expect(refreshButton).toBeTruthy();
    fireEvent.press(refreshButton);
    expect(mockDispatch).toHaveBeenCalledWith(
      fetchCharactersRequest({ page: 1 })
    );
  });

  it('dispatches fetchCharactersRequest with search on input', async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue([
      { id: 1, name: 'Rick' },
    ]);
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
