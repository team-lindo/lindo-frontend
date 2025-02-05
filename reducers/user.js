import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
const fakeApi = {
  me: async () => ({
    data: {
      id: 1,
      nickname: "test",
      email: "test@example.com",
      Posts: [
        { id: 1, content: { description: "첫 번째 게시물 #츄르 #닭가슴살" } },
      ],
      Followings: [
        { id: 2, nickname: "설이", content: { description: "설이의 게시물 #츄르 #닭가슴살" } },
        { id: 3, nickname: "삼색이", content: { description: "삼색이의 게시물 #츄르 #닭가슴살" } },
        { id: 4, nickname: "까미", content: { description: "까미의 게시물 #츄르 #닭가슴살" } },
      ],
      Followers: [
        { id: 2, nickname: "설이" },
        { id: 3, nickname: "삼색이" },
        { id: 4, nickname: "까미" },
      ],
    },
  }),
  
  login: async (loginData) => {
    //console.log("로그인 요청:", loginData);
    return await fakeApi.me(); // ✅ `me` API를 반환하여 데이터 일관성 유지
  },

  logout: async () => null,
  follow: async (id) => ({ data: { UserId: id } }),
  unfollow: async (id) => null,
  signup: async (data) => ({ data: { id: 1, name: 'New User' } }),
  changeNickname: async (data) => ({
    data: { nickname: data.nickname },
  }),
};

const initialState = {
  isLoggedIn: false,
  /*me: {
    nickname: "",
    email: "",
    Posts: [],
    Followers: [],
    Followings: [],
  },*/
  me: null, 
   // 전체 게시물 저장
  posts: [
    { id: 1, User: { id: 2, nickname: "설이" }, content: "설이의 게시물" },
    { id: 2, User: { id: 3, nickname: "삼색이" }, content: "삼색이의 게시물" },
    { id: 3, User: { id: 4, nickname: "까미" }, content: "까미의 게시물" },
  ],
  logInLoading: false,//로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false,//로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,//회원가입 시도중
  signUpDone: false,
  signUpError: null,
  followLoading: false,//팔로우 시도중
  followDone: false,
  followError: null,
  unfollowLoading: false,//언언팔로우 시도중
  unfollowDone: false,
  unfollowError: null,
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,

};

export const logIn = createAsyncThunk('user/logIn', async (loginData, thunkAPI) => {
  try {
    const response = await fakeApi.login(loginData);
    console.log("로그인 API 응답:", response.data); 
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logOut = createAsyncThunk('user/logOut', async (_, thunkAPI) => {
  try {
    await fakeApi.logout();
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const follow = createAsyncThunk('user/follow', async (userId, thunkAPI) => {
  try {
    const response = await fakeApi.follow(userId);
    return { UserId: userId };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const unfollow = createAsyncThunk('user/unfollow', async (userId, thunkAPI) => {
  try {
    await fakeApi.unfollow(userId);
    return { UserId: userId };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const signup = createAsyncThunk('user/signup', async (signUpData, thunkAPI) => {
  try {
    const response = await fakeApi.signup(signUpData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const changeNickname = createAsyncThunk('user/changeNickname', async (data) => {
  const response = await fakeApi.changeNickname(data);
  return response.data;
});



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogOutLoading(draft, action) {
      draft.logOutLoading = action.payload;
    },
    addPostToMe(draft, action) {
      if (!draft.me) {
        draft.me = { Posts: [], Followers: [], Followings: [] }; // me가 없으면 초기화
      }
      if (!draft.me.Posts) {
        draft.me.Posts = []; // Posts가 없으면 초기화
      }
     // draft.me.Posts = [...draft.me.Posts, { id: action.payload }];
     //console.log('Before Update:', [...draft.me.Posts]); // 상태 변경 전 디버깅
     draft.me.Posts.unshift({ id: action.payload, content: action.payload.content  });
     //console.log('After Update:', [...draft.me.Posts]); // 상태 변경 후 디버깅
    },
    //자기 게시물 삭제
    removePostOfMe(draft, action) {
      draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.payload);
    },
    // 전체 게시물 업데이트
    setPosts(draft, action) {
      draft.posts = action.payload; 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (draft, action) => {
        return {
          ...draft,
          ...action.payload.user,
        };
      })
      .addCase(logIn.pending, (draft) => {
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
      })
      .addCase(logIn.fulfilled, (draft, action) => {
        console.log("Payload from API:", action.payload); // 디버깅용 로그 추가

        draft.logInLoading = false;
        draft.me = action.payload;
        draft.isLoggedIn = true;
        draft.logInDone = true;
      })
      .addCase(logIn.rejected, (draft, action) => {
        draft.logInLoading = false;
        draft.logInError = action.payload;
      })
      .addCase(logOut.pending, (draft) => {
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
      })
      .addCase(logOut.fulfilled, (draft) => {
        draft.logOutLoading = false;
        draft.isLoggedIn = false;
        draft.me = null;
        //draft.me = { nickname: "", email: "", Posts: [], Followers: [], Followings: [] };
        draft.logOutDone = true;
      })
      .addCase(logOut.rejected, (draft, action) => {
        draft.logOutLoading = false;
        draft.logOutError = action.payload;
      })
      .addCase(follow.pending, (draft) => {
        draft.followLoading = true;
        draft.followError = null;
        draft.followDone = false;
      })
      .addCase(follow.fulfilled, (draft, action) => {
        draft.followLoading = false;
        if (draft.me) {
          draft.me.Followings.push({ id: action.payload.UserId });
        }
        draft.followDone = true;
      })
      .addCase(follow.rejected, (draft, action) => {
        draft.followLoading = false;
        draft.followError = action.payload;
      })
      .addCase(unfollow.pending, (draft) => {
        draft.unfollowLoading = true;
        draft.unfollowError = null;
        draft.unfollowDone = false;
      })
      .addCase(unfollow.fulfilled, (draft, action) => {
        draft.unfollowLoading = false;
        if (draft.me) {
          draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.payload.UserId);
        }
        draft.unfollowDone = true;
      })
      .addCase(unfollow.rejected, (draft, action) => {
        draft.unfollowLoading = false;
        draft.unfollowError = action.payload;
      })
      .addCase(signup.pending, (draft) => {
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
      })
      .addCase(signup.fulfilled, (draft) => {
        draft.signUpLoading = false;
        draft.signUpDone = true;
      })
      .addCase(signup.rejected, (draft, action) => {
        draft.signUpLoading = false;
        draft.signUpError = action.payload;
      })
      .addCase(changeNickname.pending, (draft) => {
        draft.changeNicknameLoading = true;
        draft.changeNicknameError = null;
        draft.changeNicknameDone = false;
      })
      .addCase(changeNickname.fulfilled, (draft, action) => {
        if (draft.me && action.payload?.nickname) {
          draft.me.nickname = action.payload.nickname;
        }
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
      })
      .addCase(changeNickname.rejected, (draft, action) => {
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.payload;
      })

  },
});
export const { setLogOutLoading,addPostToMe,removePostOfMe, setPosts  } = userSlice.actions;

export default userSlice.reducer;

