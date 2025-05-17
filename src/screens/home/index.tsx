import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import _ from 'lodash';
import {
  Text,
  AppButton,
  Margin,
  Center,
  CharacterCard,
  CharacterCardPlaceholder,
  Input,
  Padding,
} from '@components';
import { useLoading, useTranslation } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { routes } from '@navigation/routes';
import { GenericMainStackScreenProps } from '@navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCharactersRequest,
  fetchMoreCharactersRequest,
  GET_CHARACTERS_LOADING_KEY,
  GET_MORE_CHARACTERS_LOADING_KEY,
  toggleFavouriteCharacter,
} from '@store/actions';
import { getAllCharacters } from '@store/characters/selectors';
import { EButtonVariants } from '@constants/types';
import { colors } from '@theme';

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<GenericMainStackScreenProps<routes.HOME>>();
  const loading = useLoading(GET_CHARACTERS_LOADING_KEY);
  const loadingMore = useLoading(GET_MORE_CHARACTERS_LOADING_KEY);
  const characterList = useSelector(getAllCharacters);
  const [page, setPage] = useState(1);
  const [search, setQuery] = useState<string>('');
  let debounceTimeOut: { (): void; (): void; cancel: any };

  console.log({ loading, loadingMore });

  useEffect(() => {
    dispatch(fetchCharactersRequest({ page }));
  }, []);

  const handleLoadMore = () => {
    if (!loading && !loadingMore) {
      const nextPage = page + 1;
      dispatch(fetchMoreCharactersRequest({ page: nextPage }));
      setPage(nextPage);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Padding pt={26} pl={24} pr={24} pb={24}>
        <Input
          search
          placeholder={t('character.search')}
          onChangeText={(text) => {
            debounceTimeOut && debounceTimeOut.cancel();
            debounceTimeOut = _.debounce(() => {
              setQuery(text);
              dispatch(fetchCharactersRequest({ search, page }));
            }, 500);
            debounceTimeOut();
          }}
        />
      </Padding>

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
                dispatch(toggleFavouriteCharacter({ character: item }));
              }}
              onPress={() => {
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
              <Text mt={56} mb={22}>
                {t('common.noResults')}
              </Text>
              <AppButton
                variant={EButtonVariants.SECONDARY}
                label={` ${t('common.refresh')} `}
                br={5}
                style={styles.rfrsh}
                onPress={() => dispatch(fetchCharactersRequest({ page: 1 }))}
                loading={loading}
              />
            </Center>
          ) : null
        }
        ItemSeparatorComponent={() => <Margin mr={8} mt={16} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5} // Load more when scrolled 50% from the bottom
        ListFooterComponent={
          loadingMore ? (
            <Margin mt={16}>
              <CharacterCardPlaceholder />
            </Margin>
          ) : null
        }
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
