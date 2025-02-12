import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { wrapper } from '../store/configureStore';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function NodeBird({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  
  // 🔥 클라이언트에서만 Redux Persist 실행하도록 상태 관리
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>NodeBird</title>
      </Head>
      
      {/* 🔥 store.__PERSISTOR가 존재할 때만 PersistGate 실행 */}
      {isClient && store.__PERSISTOR ? (
        <PersistGate persistor={store.__PERSISTOR} loading={null}>
          <Component {...props.pageProps} />
        </PersistGate>
      ) : (
        <Component {...props.pageProps} />
      )}
    </Provider>
  );
}

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default NodeBird;

