import React from 'react';
import {
  createStackNavigator,
  StackHeaderProps,
} from '@react-navigation/stack';
import { CharacterDetailsScreen, FavouritesScreen, HomeScreen } from '@screens';
import { MainStackParamList } from './types';
import { noHeader } from '@config';
import { routes } from './routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomTabBar } from '@components/tabBar';
import { BackButton, Row } from '@components/index';

const MainStackNav = createStackNavigator<MainStackParamList>();

const Tab = createBottomTabNavigator<MainStackParamList>();
const tabs: string[] = [routes.HOME, routes.FAVORITES];

export const MainStack = () => {
  return (
    <MainStackNav.Navigator initialRouteName={routes.HOME}>
      <MainStackNav.Screen
        {...noHeader}
        name={routes.HOME}
        component={HomeTabNav}
      />
      <MainStackNav.Group screenOptions={{ presentation: 'modal' }}>
        <MainStackNav.Screen
          name={routes.CDP}
          component={CharacterDetailsScreen}
          options={() => ({
            header: (props: StackHeaderProps) => (
              <Row {...props}>
                <BackButton />
              </Row>
            ),
          })}
        />
      </MainStackNav.Group>
    </MainStackNav.Navigator>
  );
};

const HomeTabNav = () => {
  return (
    <Tab.Navigator tabBar={(props: any) => <CustomTabBar {...props} />}>
      <Tab.Screen {...noHeader} name={routes.HOME} component={HomeScreen} />
      <Tab.Screen name={routes.FAVORITES} component={FavouritesScreen} />
    </Tab.Navigator>
  );
};
