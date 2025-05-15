import { RootNavigation } from '@navigation';
import { store } from '@store';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@config';
import { LoadingOverlay } from '@components';
import 'react-native-reanimated';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
      <Toast config={toastConfig} />
      <LoadingOverlay />
    </Provider>
  );
}
