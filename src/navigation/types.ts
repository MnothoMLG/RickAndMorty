import { RouteProp } from '@react-navigation/native';
import { routes } from './routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ICharacter } from '@constants/types';

export type MainStackParamList = {
  [routes.HOME]: undefined;
  [routes.FAVORITES]: undefined;
  [routes.CDP]: {
    character: ICharacter;
  };
};

export type GenericMainStackScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;

export type GenericProfileStackRouteProps<T extends keyof MainStackParamList> =
  RouteProp<MainStackParamList, T>;
