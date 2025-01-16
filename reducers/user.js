import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  logInLoading: false,
  logOutLoading: false,
  me: null, // 초기값을 null로 설정
  signUpData: {},
  loginData: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      state.me = action.payload; // 로그인을 통해 me 상태 업데이트
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.me = null; // 사용자 데이터 초기화
      state.logOutLoading = false;
    },
    setLogOutLoading(state, action) {
      state.logOutLoading = action.payload;
    },
  },
});

export const { logIn, logOut, setLogOutLoading } = userSlice.actions;

export default userSlice.reducer;

