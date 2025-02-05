import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// 서버에서는 storage 사용 불가능 → NoopStorage 적용
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

// 클라이언트 환경에서는 `localStorage` 사용
const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

export default storage;
