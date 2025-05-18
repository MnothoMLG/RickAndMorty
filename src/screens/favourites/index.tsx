import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { colors } from '@theme';
import { Margin, CharacterCard, Text, Center } from '@components';
import { useTranslation } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { routes } from '@navigation/routes';
import { GenericMainStackScreenProps } from '@navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavouriteCharacter } from '@store/actions';
import { getAllFavourites } from '@store/characters/selectors';
import { EmptyGlassIcon } from '@assets/icons';

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
        testID='Fav-FlatList'
        extraData={favs}
        contentContainerStyle={styles.items}
        renderItem={({ item, index }) => (
          <CharacterCard
            index={index}
            character={item}
            toggleFavorite={() => {
              dispatch(toggleFavouriteCharacter({ character: item }));
            }}
            onPress={() => {
              navigation.navigate(routes.CDP, {
                character: item,
              });
            }}
          />
        )}
        ItemSeparatorComponent={() => <Margin mt={16} />}
        ListEmptyComponent={() => (
          <Center>
            <Text mt={40} />
            <EmptyGlassIcon width={40} height={40} />
            <Text mt={12}>{t('common.noResults')}</Text>
          </Center>
        )}
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
