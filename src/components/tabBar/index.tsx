import React, { FC, useCallback, useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Text } from '@components';
import { RickIcon, MortyIcon } from '@assets';
import { SvgProps } from 'react-native-svg';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from '@navigation/routes';
import { colors } from '@theme';

const tabHeight = 104;

export const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      onPress({
        name: state?.routes?.[state?.index]?.name,
        key: state?.routes?.[state?.index]?.key,
        isFocused: false,
        index: state?.index,
        animateOnly: true,
      });
    }
  }, [isFocused]);

  useEffect(() => {}, [state?.routes]);

  const onPress = (args: {
    name: string;
    key: string;
    isFocused: boolean;
    index: number;
    animateOnly?: boolean;
  }) => {
    const event = !args.animateOnly
      ? navigation.emit({
          type: 'tabPress',
          target: args.key,
          canPreventDefault: true,
        })
      : {
          defaultPrevented: false,
        };
    if (!args.isFocused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      if (!args.animateOnly) {
        let routeName = args.name;

        navigation.navigate({ name: routeName, merge: true });
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;
          const routeName: any =
            route.name === 'CartAction' ? routes.FAVORITES : route.name;
          const Icon = icons[route.name];
          const color = isFocused ? colors.primary : colors.grey70;

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableWithoutFeedback
              key={index}
              accessibilityRole='button'
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={() =>
                onPress({
                  name: route.name,
                  key: route.key,
                  isFocused,
                  index,
                })
              }
              onLongPress={onLongPress}
            >
              <View style={styles.item}>
                {options?.tabBarBadge ? (
                  <View style={styles.badge}>
                    <Text bold color={colors.white} size={12}>
                      {options?.tabBarBadge}
                    </Text>
                  </View>
                ) : null}
                <Icon width={24} height={24} color={color} />
                <Text bold={isFocused} mt={5} color={color} size={12} lh={13}>
                  {routeName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </>
  );
};

const icons: { [key: string]: FC<SvgProps> } = {
  [routes.HOME]: RickIcon,
  [routes.FAVORITES]: MortyIcon,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    paddingTop: 16,
    height: tabHeight,
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 1,
      height: 5,
    },
    paddingHorizontal: 5,
    elevation: 5,
  },
  padding: {
    backgroundColor: 'white',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    position: 'absolute',
    top: -4,
    right: 20,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  activeItem: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    position: 'absolute',
    left: 0,
    right: 0,
  },
});
