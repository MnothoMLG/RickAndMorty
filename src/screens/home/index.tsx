import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { colors } from '@theme';
import {
  Footer,
  Text,
  AppButton,
  Margin,
  Center,
  Padding,
  CharacterCard,
  Loader,
  BackButton,
  CharacterCardPlaceholder,
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

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<GenericMainStackScreenProps<routes.HOME>>();
  const loading = useLoading(GET_CHARACTERS_LOADING_KEY);
  const characterList = useSelector(getAllCharacters);

  useEffect(() => {
    dispatch(fetchCharactersRequest());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Margin mt={24} />

      <FlatList
        data={loading ? new Array(10) : characterList}
        style={styles.list}
        contentContainerStyle={styles.items}
        renderItem={({ item, index }) =>
          loading ? (
            <CharacterCardPlaceholder />
          ) : (
            <CharacterCard
              index={index}
              character={item}
              toggleFavorite={() => {
                showToast({
                  type: EToastTypes.SUCCESS,
                  message: 'Coming soon :]',
                });

                dispatch(toggleFavouriteCharacter({ character: item }));
              }}
              onPress={() => {
                //go to details screen
                navigation.navigate(routes.CDP, {
                  character: item,
                });
              }}
            />
          )
        }
        ListEmptyComponent={
          !loading ? (
            <Center>
              <Text mt={36} mb={12}>
                {t('common.noResults')}
              </Text>
              <AppButton
                variant={EButtonVariants.SECONDARY}
                label={` ${t('common.refresh')} `}
                br={5}
                style={styles.rfrsh}
                onPress={() => dispatch(fetchCharactersRequest())}
                loading={loading}
              />
            </Center>
          ) : null
        }
        ItemSeparatorComponent={() => <Margin mr={8} mt={16} />}
      />
    </SafeAreaView>
  );
};

export default Home;

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
