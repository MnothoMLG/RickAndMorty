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
} from '@components';
import { useLoading, useTranslation } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { routes } from '@navigation/routes';
import { GenericMainStackScreenProps } from '@navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCharactersRequest,
  GET_LOAN_APPLICATIONS_LOADING_KEY,
} from '@store/actions';
import { getAllCharacters } from '@store/characters/selectors';
import { showToast } from '@util';
import { EButtonVariants, EToastTypes } from '@constants/types';

const Favourites = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation =
    useNavigation<GenericMainStackScreenProps<routes.DASHBOARD>>();
  const loading = useLoading(GET_LOAN_APPLICATIONS_LOADING_KEY);
  const characterList = useSelector(getAllCharacters);

  console.log('characterList', characterList);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(fetchCharactersRequest());
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Margin mt={24} />
      <BackButton />
      <FlatList
        data={characterList}
        ListHeaderComponent={
          <Text size={29} mb={42} xtraBold>
            BAck
          </Text>
        }
        style={styles.list}
        contentContainerStyle={styles.items}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        numColumns={2}
        renderItem={({ item, index }) => (
          <CharacterCard
            index={index}
            character={item}
            onPress={() => {
              showToast({
                type: EToastTypes.SUCCESS,
                message: 'Coming soon :]',
              });
            }}
          />
        )}
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

      <Footer>
        <Padding pl={24} pr={24}>
          <AppButton
            onPress={() => {
              // navigation.navigate(routes.APPLY);
            }}
            br={10}
            label={t('dashboard.apply').toLocaleUpperCase()}
          />
        </Padding>
      </Footer>
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
