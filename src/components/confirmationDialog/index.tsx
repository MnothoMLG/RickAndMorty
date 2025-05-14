import { colors } from '@theme';
import React, { FC } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { useTranslation } from '@hooks/useTranslationHook';
import { useDispatch, useSelector } from 'react-redux';
import { getAlertState } from '@store/alert/selectors';
import { clearAndHideAlert } from '@store/alert/actions';
import { AppButton } from '@components/appButton';
import { Margin } from '@components/layout/layout';
import { Text } from '../text';
import _ from 'lodash';
import { EButtonVariants } from '@constants/types';

interface Props {}
export const ConfirmationDialog: FC<Props> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector(getAlertState);
  const { primary_btn, title, message, secondary_btn, shown } = state;

  const close = () => {
    dispatch(clearAndHideAlert());
  };

  if (!shown) return null; //re-render to avoid issues with app state changes
  return (
    <SwipeablePanel
      onClose={close}
      onlySmall
      isActive={!!shown}
      scrollViewProps={{ scrollEnabled: false }}
      style={styles.swipeModal}
      smallPanelHeight={349}
      barContainerStyle={styles.barContainer}
      barStyle={styles.bar}
      fullWidth
      closeOnTouchOutside={true}
    >
      <View style={styles.container}>
        <View>
          <Text bold>{title}</Text>
          <Text mt={16} mb={88}>
            {message}
          </Text>
        </View>
        <View>
          <AppButton
            variant={EButtonVariants.PRIMARY}
            {...primary_btn}
            bold
            onPress={() => {
              primary_btn?.onPress && primary_btn.onPress();
              close();
            }}
          />

          {!_.isEmpty(secondary_btn) && (
            <>
              <Margin mb={16} />
              <AppButton
                variant={EButtonVariants.SECONDARY}
                bold
                {...secondary_btn}
                onPress={() => {
                  secondary_btn?.onPress && secondary_btn.onPress();
                  close();
                }}
              />
            </>
          )}
        </View>
      </View>
      <SafeAreaView style={{ backgroundColor: colors.static }} />
    </SwipeablePanel>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.static,
    height: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  swipeModal: {
    padding: 24,
    backgroundColor: colors.static,
    justifyContent: 'flex-end',
    paddingTop: 0,
    height: '100%',
  },
  barContainer: {
    backgroundColor: colors.static,
    height: 10,
    paddingTop: 8,
    marginBottom: 24,
  },
  bar: { width: 63, height: 3 },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: colors.secondary,
  },
});
