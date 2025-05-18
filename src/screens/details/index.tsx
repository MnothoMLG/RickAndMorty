import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { colors } from '@theme';
import {
  Text,
  AppButton,
  Margin,
  Padding,
  Image,
  BackButton,
  Row,
} from '@components';
import { useTranslation } from '@hooks';
import { useRoute } from '@react-navigation/native';
import { routes } from '@navigation/routes';
import { GenericMainStackRouteProps } from '@navigation/types';
import { EButtonVariants } from '@constants/types';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';

const CharacterDetails = () => {
  const { t } = useTranslation();
  const { params } = useRoute<GenericMainStackRouteProps<routes.CDP>>();
  const character = params?.character;
  const numberOfEpisodes = character?.episode?.length || 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Margin style={styles.back}>
          <BackButton />
        </Margin>
        <View style={styles.image}>
          <Image style={styles.image} source={{ uri: character?.image }} />

          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.5)', '#000']}
            style={styles.gradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          >
            <Text mt={12} bold size={24} color={colors.white}>
              {character?.name}
            </Text>

            <Text size={14} color={colors.white}>
              {character?.gender} - {character?.species}
            </Text>
          </LinearGradient>
        </View>

        <Padding pl={24} pr={24} pt={16}>
          <Row justify='space-between'>
            <Margin style={styles.block}>
              <Text size={14} bold>
                {t('character.origin')}
              </Text>
              <Text>{character?.origin.name}</Text>
            </Margin>

            <Margin style={styles.block}>
              <Text size={14} bold>
                {t('character.status')}
              </Text>
              <Text>{character?.status}</Text>
            </Margin>

            <Margin style={styles.block}>
              <Text size={14} bold>
                {t('character.location')}
              </Text>
              <Text>{character?.location.name}</Text>
            </Margin>
          </Row>
          <Margin mt={16} mb={24} style={styles.bio}>
            <Text align='center'>
              {t('character.bio')
                .replace('{0}', character?.name)
                .replace('{1}', String(numberOfEpisodes))
                .replace('{2}', numberOfEpisodes > 1 ? 's' : '')}
            </Text>
          </Margin>

          <AppButton
            variant={EButtonVariants.SECONDARY}
            label={'<> {0} </>'.replace('{0}', t('common.learnMore'))}
            onPress={() => {
              WebBrowser.openBrowserAsync(character?.url, {
                showInRecents: true,
              });
            }}
          />
        </Padding>
      </ScrollView>
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
  block: { maxWidth: '30%' },
  bio: {
    backgroundColor: colors.borderGrey,
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  gradient: {
    position: 'absolute',
    height: 100,
    width: '100%',
    bottom: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'flex-end',
    padding: 16,
  },
  back: {
    position: 'absolute',
    left: 0,
    top: 24,
    zIndex: 1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: 400,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 8,
  },
  list: { padding: 16, width: '100%' },
});
