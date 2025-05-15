import Toast from 'react-native-toast-message';
import { ICharacter, ToastConfig } from '@constants/types';

export const showToast = ({ type, message, topOffset }: ToastConfig) => {
  Toast.show({
    type,
    text2: message,
    visibilityTime: 3000,
    position: topOffset ? 'top' : 'bottom',
    bottomOffset: 100,
    topOffset: topOffset ?? 80,
  });
};

export const isFavourite = (
  //could use id
  characterId: ICharacter,
  favourites: Array<ICharacter>
) => {
  return favourites.some((char) => char.id === characterId.id);
};
