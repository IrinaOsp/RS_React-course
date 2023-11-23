import { Provider } from 'react-redux';
import ErrorBoundary from '../components/ErrorBoundary';
import { store } from '../state/store';

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ErrorBoundary>
  );
}
export default MyApp;
