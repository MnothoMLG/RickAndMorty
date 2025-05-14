import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '@screens';
import { MainStackParamList } from './types';
import { noHeader } from '@config';
import { routes } from './routes';

const MainStackNav = createStackNavigator<MainStackParamList>();

export const MainStack = () => {
  return (
    <MainStackNav.Navigator initialRouteName={routes.HOME}>
      <MainStackNav.Screen
        {...noHeader}
        name={routes.HOME}
        component={HomeScreen}
      />
    </MainStackNav.Navigator>
  );
};
