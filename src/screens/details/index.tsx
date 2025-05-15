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
  Image,
  BackButton,
} from '@components';
import { useLoading, useTranslation } from '@hooks';
import { useNavigation, useRoute } from '@react-navigation/native';
import { routes } from '@navigation/routes';
import {
  GenericMainStackRouteProps,
  GenericMainStackScreenProps,
} from '@navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCharactersRequest,
  GET_LOAN_APPLICATIONS_LOADING_KEY,
} from '@store/actions';
import { getAllCharacters } from '@store/characters/selectors';
import { showToast } from '@util';
import { EButtonVariants, EToastTypes } from '@constants/types';

const CharacterDetails = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<GenericMainStackScreenProps<routes.CDP>>();
  const { params } = useRoute<GenericMainStackRouteProps<routes.CDP>>();
  const loading = useLoading(GET_LOAN_APPLICATIONS_LOADING_KEY);
  const characterList = useSelector(getAllCharacters);
  const character = params?.character;

  console.log('characterList', characterList);

  return (
    <SafeAreaView style={styles.container}>
      <Margin mt={24} />
      <BackButton />
      <Image style={styles.image} source={{ uri: character?.image }} />
      <Text size={24} bold>
        {character?.name}
      </Text>
      <Text size={16} color={colors.grey70}>
        {character?.status} - {character?.species}
      </Text>

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

export default CharacterDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 24,
  },
  image: {
    width: '100%',
    height: 400,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  list: { padding: 16, width: '100%' },
});
