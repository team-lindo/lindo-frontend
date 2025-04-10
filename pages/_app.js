import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { wrapper } from '../store/configureStore';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/globals.css';
import { setMe } from "../reducers/user";

// ✅ AppInitializer 컴포넌트 분리
function AppInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("me");
    if (saved) {
      try {
        const user = JSON.parse(saved);
        dispatch(setMe(user));
      } catch (e) {
        console.error("me 복구 실패", e);
      }
    }
  }, [dispatch]);

  return null;
}

function NodeBird({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
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

      <AppInitializer />

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
