import { RouteProp } from '@react-navigation/native';
import { routes } from './routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MainStackParamList = {
  [routes.DASHBOARD]: undefined;
  [routes.APPLY]: undefined;
  [routes.APPLICATIONS]: undefined;
  [routes.CONFIRMATION]: {
    message: string;
  };
};

export type GenericMainStackScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;

export type GenericProfileStackRouteProps<T extends keyof MainStackParamList> =
  RouteProp<MainStackParamList, T>;
