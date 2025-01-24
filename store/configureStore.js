import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers'; // 루트 리듀서 가져오기

// Redux Persist 설정
const persistConfig = {
  key: 'root', // 로컬 스토리지에 저장될 키 이름
  storage, // 로컬 스토리지 사용
  whitelist: ['user'], // 유지할 상태 (user 상태만 저장)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux Store 생성 함수
const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer, // persistReducer로 감싼 리듀서를 사용
    devTools: process.env.NODE_ENV !== 'production', // 개발 환경에서 Redux DevTools 활성화
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // 직렬화 경고 무시
      }),
  });

  // Persistor 생성
  store.__persistor = persistStore(store);

  return store;
};

// next-redux-wrapper 설정
export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== 'production', // 디버깅 활성화
});

export default wrapper;


/*import { createWrapper } from 'next-redux-wrapper';
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