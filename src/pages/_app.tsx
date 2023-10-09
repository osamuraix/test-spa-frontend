import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import getStore from '@/store';
import Layout from '@/components/Layout';

const store = getStore();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
