import Toast from 'react-native-toast-message';
import { ToastConfig } from '@constants/types';

export const showToast = ({
  type,
  message,
  description,
  topOffset,
}: ToastConfig) => {
  Toast.show({
    type,
    text2: message,
    // text1: description,
    visibilityTime: 3000,
    position: topOffset ? 'top' : 'bottom',
    bottomOffset: 100,
    topOffset: topOffset ?? 80,
  });
};
