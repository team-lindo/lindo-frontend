import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "../reducers";
import storageSession from "redux-persist/lib/storage/session";

// SSR에서 `redux-persist` 오류 방지
const createNoopStorage = () => {
  return {
    getItem: async () => null,
    setItem: async () => {},
    removeItem: async () => {},
  };
};

// 클라이언트에서는 `storageSession`, 서버에서는 `noopStorage`
const storage = typeof window !== "undefined" ? storageSession : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user" ,"product"], // 저장할 Redux state 설정 (예: user 정보만 저장)
};


const makeStore = () => {
  const isServer = typeof window === "undefined";

  const reducer = isServer
    ? rootReducer // 서버에서는 persist 없이
    : persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }),
  });

  if (!isServer) {
    store.__PERSISTOR = persistStore(store);
  }

  return store;
};


export const wrapper = createWrapper(makeStore);
