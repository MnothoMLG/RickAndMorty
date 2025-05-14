import React, { FC } from 'react';
import { Text } from '../text';
import { StyleSheet, View } from 'react-native';
import { colors } from '@theme';
import { AppButton } from '../appButton';
import { EButtonVariants, ICharacter } from '@constants/types';
import { ArrowRightIcon } from '@assets';
import { Row } from '../layout/layout';
import { useTranslation } from '@hooks';
import { AnimatedButton } from '../appButton';

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
      <Text size={20} bold>
        {character?.name}
      </Text>

      <Row justify='space-between' align='flex-end'>
        <View>
          {/* <Text>{t('loans.max')}</Text>
          <Text color={colors.primary} bold size={24}>
            ${loan?.maximumAmount}
          </Text>
          <Text>
            {t('loans.interest').replace('{0}', `${loan?.interestRate}`)}
          </Text> */}
        </View>

        <AppButton
          br={10}
          variant={EButtonVariants.SECONDARY}
          label={t('common.learnMore')}
          iconRight={ArrowRightIcon}
          textSize={8}
          style={styles.learnMore}
        />
      </Row>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.borderGrey,
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 139,
    padding: 16,
    paddingBottom: 12,
    justifyContent: 'space-between',
  },
  learnMore: { height: 21 },
});
