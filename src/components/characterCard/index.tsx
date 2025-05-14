import React, { FC } from 'react';
import { Text } from '../text';
import { StyleSheet, View } from 'react-native';
import { colors } from '@theme';
import { AppButton } from '../appButton';
import { EButtonVariants, ICharacter } from '@constants/types';
import { ArrowRightIcon } from '@assets';
import { Margin, Row } from '../layout/layout';
import { useTranslation } from '@hooks';
import { AnimatedButton } from '../appButton';
import { Image } from '../image';

export interface Props {
  character: ICharacter;
  index: number;
  onPress: () => void;
}

export const CharacterCard: FC<Props> = ({ onPress, character, index }) => {
  const { t } = useTranslation();

  return (
    <AnimatedButton
      animation={'fadeInUp'}
      delay={index * 100}
      onPress={onPress}
      style={styles.container}
    >
      <Image
        style={styles.image}
        source={{ uri: character.image }}
        resizeMode='cover'
      />
      <Margin mt={8} mb={8} style={styles.details}>
        <Text
          size={16}
          bold
          numberOfLines={1}
          wrap='nowrap'
          // style={{ width: 200 }}
          ellipsizeMode='tail'
        >
          {character?.name}
        </Text>
        <Text>{t('character.species').replace('{0}', character?.species)}</Text>
        <Text>{t('character.gender').replace('{0}', character?.gender)}</Text>
      </Margin>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.borderGrey,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    maxHeight: 430,
    flex: 1,
    marginHorizontal: 4,
  },
  details: {
    height: 70,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  viewMore: { height: 21, maxWidth: 100, marginTop: 8, alignSelf: 'flex-end' },
});
