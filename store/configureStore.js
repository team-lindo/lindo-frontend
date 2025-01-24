import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // 저장할 reducer 목록
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  store.__persistor = persistStore(store); // persistStore 생성
  return store;
};

export const wrapper = createWrapper(makeStore);

/*import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // 저장할 reducer 지정
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== 'production', // 디버깅 활성화
});
*/

/*import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // 상태 중 저장할 부분 지정
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  store.__persistor = persistStore(store); // persistStore 생성
  return store;
};

export const wrapper = createWrapper(makeStore);
*/
/*

import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers'; // 루트 리듀서 가져오기
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

// 서버 환경에서 redux-persist 무시
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem() {
      return Promise.resolve();
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const persistStorage =
  typeof window !== 'undefined' ? storage : createNoopStorage();

// Redux Persist 설정
const persistConfig = {
  key: 'root', // 로컬 스토리지에 저장될 키 이름
  storage: persistStorage, // 서버에서는 noop storage 사용
  whitelist: ['user'], // 유지할 상태 (user 상태만 저장)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux Store 생성 함수
const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // 직렬화 경고 무시
      }),
  });

  // Persistor 생성 (클라이언트 환경에서만 생성)
  if (typeof window !== 'undefined') {
    store.__persistor = persistStore(store);
  }

  return store;
};

// next-redux-wrapper 설정
export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});

export default wrapper;
*/
/*
import { createWrapper } from 'next-redux-wrapper';
import reducer from '../reducers';
import { configureStore } from '@reduxjs/toolkit';

const makeStore = () =>
    configureStore({
        reducer, // 루트 리듀서 설정
        devTools: process.env.NODE_ENV !== 'production', // 개발 환경에서 Redux DevTools 활성화
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // 기본 미들웨어 사용
    });

const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV !== 'production', // 개발 환경에서 디버깅 활성화
});

export default wrapper;
*/
/*import { createWrapper } from 'next-redux-wrapper';
import reducer from '../reducers';
import { configureStore } from '@reduxjs/toolkit';

const makeStore = () =>
    configureStore({
        reducer,
        devTools: process.env.NODE_ENV !== 'production', // 개발 환경에서 Redux DevTools 활성화
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // 기본 미들웨어 사용
    });

const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV !== 'production',
});

export default wrapper;
*/

/*import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import reducer from '../reducers';

function getServerState() {
  return typeof document !== 'undefined'
    ? JSON.parse(document.querySelector('#__NEXT_DATA__').textContent)?.props.pageProps.initialState
    : undefined;
}
const serverState = getServerState();
console.log('serverState', serverState);
const makeStore = () => configureStore({
  reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  preloadedState: serverState, // SSR
});

export default createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});*/