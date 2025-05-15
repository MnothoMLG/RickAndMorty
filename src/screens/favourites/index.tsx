import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { colors } from '@theme';
import {
  Text,
  AppButton,
  Margin,
  Center,
  CharacterCard,
  Loader,
  BackButton,
} from '@components';
import { useLoading, useTranslation } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { routes } from '@navigation/routes';
import { GenericMainStackScreenProps } from '@navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCharactersRequest,
  GET_CHARACTERS_LOADING_KEY,
  toggleFavouriteCharacter,
} from '@store/actions';
import {
  getAllCharacters,
  getAllFavourites,
} from '@store/characters/selectors';
import { showToast } from '@util';
import { EButtonVariants, EToastTypes } from '@constants/types';

const Favourites = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation =
    useNavigation<GenericMainStackScreenProps<routes.FAVORITES>>();

  const favs = useSelector(getAllFavourites);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favs}
        style={styles.list}
        contentContainerStyle={styles.items}
        renderItem={({ item, index }) => (
          <CharacterCard
            index={index}
            character={item}
            toggleFavorite={() => {
              dispatch(toggleFavouriteCharacter({ character: item }));
            }}
            onPress={() => {}}
          />
        )}
        ItemSeparatorComponent={() => <Margin mr={8} mt={16} />}
      />
    </SafeAreaView>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 24,
  },
  items: {
    paddingBottom: 106,
    padding: 8,
  },
  rfrsh: { width: 90 },
  list: { padding: 16, width: '100%' },
});
