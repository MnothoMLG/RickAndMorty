import { ActivityIndicator, Modal, StyleSheet } from 'react-native';
import { FC } from 'react';
import {
  APPLY_FOR_LOAN_LOADING_KEY,
  GET_LOAN_PRODUCTS_LOADING_KEY,
} from '@store/actions';
import { colors } from '@theme';
import { Text } from '@components/text';
import { Center } from '@components/layout/layout';
import { useTranslation, useLoading } from '@hooks';

export const LoadingOverlay: FC<unknown> = () => {
  const loading = useLoading(GET_LOAN_PRODUCTS_LOADING_KEY);
  const { t } = useTranslation();

  return (
    <Modal transparent visible={loading}>
      <Center style={styles.wrapper}>
        <ActivityIndicator color={colors.primary} size='large' />

        <Text color={colors.static}>{t('common.wait')}</Text>
      </Center>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flex: 1,
    backgroundColor: `${colors.dark}A1`,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
