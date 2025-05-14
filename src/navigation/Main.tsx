import React, { Fragment, useEffect } from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { FavouritesScreen, HomeScreen } from '@screens';
import { MainStackParamList } from './types';
import { noHeader } from '@config';
import { routes } from './routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { CustomTabBar } from '@components/tabBar';

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
    </MainStackNav.Navigator>
  );
};

const HomeTabNav = () => {
  return (
    <Tab.Navigator
      tabBar={(props: any) => <CustomTabBar {...props} />}
      // screenOptions={({ route }) => ({
      //   header: () =>
      //     tabs.includes(route.name) ? (
      //       <Header title={route.name} overrideBack variant={'basic'} />
      //     ) : undefined,
      //   tabBarIcon: ({ focused }) => {
      //     const Icon = icons[route.name];
      //     const color = focused ? colors.primary : colors.grey70;

      //     return (
      //       <Fragment>
      //         <Icon width={24} height={24} color={color} />
      //         <Text bold={focused} mt={5} color={color} size={13} lh={13}>
      //           {route.name}
      //         </Text>
      //       </Fragment>
      //     );
      //   },
      //   tabBarActiveTintColor: colors.primary,
      //   tabBarShowLabel: false,
      //   tabBarInactiveTintColor: colors.grey70,
      //   tabBarStyle: styles.tabBarStyle,
      //   unmountOnBlur: true,
      // })}
    >
      <Tab.Screen {...noHeader} name={routes.HOME} component={HomeScreen} />
      <Tab.Screen name={routes.FAVORITES} component={FavouritesScreen} />
    </Tab.Navigator>
  );
};
