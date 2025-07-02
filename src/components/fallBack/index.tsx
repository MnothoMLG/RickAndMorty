import React, { FC } from 'react';
import { View } from 'react-native';
import { Text } from '../text';
import { AppButton } from '../appButton';

interface FallbackProps {
  error: Error;
  resetError: () => void;
}
export const FallbackComponent: FC<FallbackProps> = (props) => (
  <View>
    <Text>Something happened!</Text>
    <Text>{props.error.toString()}</Text>
    <AppButton onPress={props.resetError} label={'Try again'} />
  </View>
);
