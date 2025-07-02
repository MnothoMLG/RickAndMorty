import { RootNavigation } from '@navigation';
import { store } from '@store';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@config';
import 'react-native-reanimated';
import ErrorBoundary from 'react-native-error-boundary';
import { View, Button } from 'react-native';
import { FallbackComponent } from '@components/fallBack';

export default function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary
        FallbackComponent={FallbackComponent}
        onError={() => {
          console.log('An error occurred in the app');
        }}
      >
        <RootNavigation />
      </ErrorBoundary>
      <Toast config={toastConfig} />
    </Provider>
  );
}
