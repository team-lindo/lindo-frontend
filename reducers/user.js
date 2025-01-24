import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
const fakeApi = {
  //현재 로그인한 사용자의 정보를 가져오기 위한 API
  me: async (data) => ({
    data: {
      id: 1,
      nickname: data.nickname,
      email: data.email,
      Posts: [{id: 1}],
      Followings: [{nickname:'설이'},{nickname:'삼색이'},{nickname:'까미'}],
      Followers: [{nickname:'설이'},{nickname:'삼색이'},{nickname:'까미'}],
    },
  }),
  //사용자가 로그인 요청을 할 때 호출되는 API
  login: async (loginData) => ({
    data: {
      id: 1,
      nickname: loginData.nickname,
      email: loginData.email,
      Posts: [ {id:1}],
      Followings: [{nickname:'설이'},{nickname:'삼색이'},{nickname:'까미'}],
      Followers: [{nickname:'설이'},{nickname:'삼색이'},{nickname:'까미'}],
    },
  }),
  logout: async () => null,
  follow: async (id) => ({ data: { UserId: id } }),
  unfollow: async (id) => null,
  signup: async (data) => ({ data: { id: 1, name: 'New User' } }),
};

const initialState = {
  isLoggedIn: false,
  me: {
    nickname: "",
    email: "",
    Posts: [],
    Followers: [],
    Followings: [],
  },
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  followLoading: false,
  followDone: false,
  followError: null,
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
};

export const logIn = createAsyncThunk('user/logIn', async (loginData, thunkAPI) => {
  try {
    const response = await fakeApi.login(loginData);
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
export const updatePost = createAsyncThunk('post/updatePost', async (data) => {
  const response = await fakeApi.updatePost(data);
  return response.data;
});

export const removePost = createAsyncThunk('post/removePost', async (data) => {
  const response = await fakeApi.removePost(data);
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
     console.log('Before Update:', [...draft.me.Posts]); // 상태 변경 전 디버깅
     draft.me.Posts.unshift({ id: action.payload });
     console.log('After Update:', [...draft.me.Posts]); // 상태 변경 후 디버깅
    },
    //자기 게시물 삭제
    removePostOfMe(draft, action) {
      draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.payload);
    },

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
        if (draft.me) {
          draft.me.nickname = action.payload.nickname;
        }
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
      })
      .addCase(changeNickname.rejected, (draft, action) => {
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.payload;
      })
      .addCase(updatePost.pending, (draft, action) => {
        draft.updatePostLoading = true;
        draft.updatePostDone = false;
        draft.updatePostError = null;
      })
      .addCase(updatePost.fulfilled, (draft, action) => {
        draft.updatePostLoading = false;
        draft.updatePostDone = true;
        draft.mainPosts.find((v) => v.id === action.payload.PostId).content = action.payload.content;
      })
      .addCase(updatePost.rejected, (draft, action) => {
        draft.updatePostLoading = false;
        draft.updatePostError = action.error;
      })
      .addCase(removePost.pending, (draft, action) => {
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
      })
      .addCase(removePost.fulfilled, (draft, action) => {
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.payload.PostId);
      })
      .addCase(removePost.rejected, (draft, action) => {
        draft.removePostLoading = false;
        draft.removePostError = action.error;
      })
  },
});
export const { setLogOutLoading,addPostToMe,removePostOfMe } = userSlice.actions;

export default userSlice.reducer;

