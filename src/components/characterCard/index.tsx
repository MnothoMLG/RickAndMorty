import React, { FC } from 'react';
import { Text } from '../text';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@theme';
import { ICharacter } from '@constants/types';
import { HeartFilledIcon, HeartIcon } from '@assets';
import { Margin, Row } from '../layout/layout';
import { useTranslation } from '@hooks';
import { AnimatedButton } from '../appButton';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

import { Image } from '../image';
import { isFavourite } from '@util';
import { useSelector } from 'react-redux';
import {
  getAllCharacters,
  getAllFavourites,
} from '@store/characters/selectors';

export interface Props {
  character: ICharacter;
  index: number;
  onPress: () => void;
  toggleFavorite: () => void;
}

export const CharacterCard: FC<Props> = ({
  onPress,
  toggleFavorite,
  character,
  index,
}) => {
  const favs = useSelector(getAllFavourites);
  const { t } = useTranslation();
  const isFavorite = isFavourite(character, favs);

  return (
    <AnimatedButton
      animation={'fadeInUp'}
      delay={index * 70}
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}
      duration={350}
      useNativeDriver
      key={character.id}
    >
      <Row justify='space-between'>
        <Image style={styles.image} source={{ uri: character.image }} />
        <Margin style={styles.details}>
          <TouchableOpacity onPress={toggleFavorite} style={styles.viewMore}>
            {!isFavorite ? (
              <HeartIcon
                color={colors.grey70}
                width={20}
                height={20}
                onPress={toggleFavorite}
              />
            ) : (
              <HeartFilledIcon
                color={colors.danger}
                width={20}
                height={20}
                onPress={toggleFavorite}
              />
            )}
          </TouchableOpacity>

          <Text size={16} bold>
            {character?.name}
          </Text>
          <Text>
            {t('character.species').replace('{0}', character?.species)}
          </Text>
          <Text>{t('character.gender').replace('{0}', character?.gender)}</Text>
        </Margin>
      </Row>
    </AnimatedButton>
  );
};

export const CharacterCardPlaceholder: FC = () => {
  return (
    <AnimatedButton
      animation={'fadeIn'}
      style={styles.container}
      activeOpacity={0.8}
    >
      <Row>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={[styles.image, styles.imgLoader]}
        />
        <Margin style={styles.details}>
          <ShimmerPlaceholder LinearGradient={LinearGradient} />
          <Margin mt={8} />
          <ShimmerPlaceholder LinearGradient={LinearGradient} />
          <Margin mt={8} />
          <ShimmerPlaceholder LinearGradient={LinearGradient} />
        </Margin>
      </Row>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.borderGrey,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    justifyContent: 'space-between',
    height: 130,
  },
  imgLoader: { height: 102 },
  details: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    paddingLeft: 12,
  },
  image: {
    width: 100,
    height: '100%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  viewMore: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 30,
    maxWidth: 30,
    alignSelf: 'flex-end',
  },
});
