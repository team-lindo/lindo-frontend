import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { bookmark, unbookmark,loadPost,likePost,unlikePost } from "./post";
import axiosInstance from '../api/axiosInstance'; 

export const fakeApi = {
  me: async () => ({
    data: {
      id: 1,
      nickname: "test",
      email: "test@example.com",
      Posts: [
        {
          id: 1,
          content:  "test의 게시물 #여름 #밤팔팔" ,
          Images: [{ id: 1, src: "/images/test.jpg"  }],
        },
      ],
      Followings: [
        {
          id: 2,
          nickname: "test2",
          Posts: [{
            id: 2,
            content: "test2의 게시물" ,
            Images: [{ id: 2, src: "/images/test2.jpg" }],
          },],
        },
        {
          id: 3,
          nickname: "test3",
          Posts: [ {
            id: 3,
            content: "test3의 게시물" ,
            Images: [{ id: 3, src: "/images/test3.jpg" }],
          },],
        },

        {
          id: 5,
          nickname: "test1",
          Posts: [
            {
              id: 5,
              content: "test1의 게시물 #봄 #가을" ,
              Images: [{ id: 5, src: "/images/test1.jpg" }],
            },
          ],
        },
      ],
      Followers: [
        { id: 2, nickname: "test2" },
        { id: 3, nickname: "test3" },
        { id: 4, nickname: "test4" },
        { id: 5, nickname: "test1" },
      ],
      savedItems: [
        { id: 1, name: '청바지', imageUrl: '/images/jeans1.jpg' },
        { id: 2, name: '셔츠', imageUrl: '/images/knit1.jpg' },
      ],
      likedPosts: [],
      bookmarkedPosts: [],
     },
  }),

  test1: async () => ({
    data: {
      id: 5,
      nickname: "test1",
      email: "test1@example.com",
      Posts: [
        {
          id: 5,
          content: "test1의 게시물 #봄 #가을" ,
          Images: [{ id: 11, src: "/images/test1.jpg" }],
        },
      ],
      Followings: [
        {
          id: 1,
          nickname: "test",
          content:  "test의 게시물 #여름 #반팔" ,
        },
      ],
      Followers: [{ id: 1, nickname: "test" }],
    },
  }),

  getUserById: async (id) => {
    const users = {
      1: await fakeApi.me(),
      2: {
        data: {
          id: 2,
          nickname: "test2",
          Posts: [{
            id: 2,
            content: "test2의 게시물" ,
            Images: [{ id: 2, src: "/images/test2.jpg" }],
          }],
          Followings: [],
          Followers: [],
        }
      },
      3: {
        data: {
          id: 3,
          nickname: "test3",
          Posts: [{
            id: 3,
            content:  "test3의 게시물" ,
            Images: [{ id: 3, src: "/images/test3.jpg" }],
          }],
          Followings: [],
          Followers: [],
        }
      },
      5: await fakeApi.test1(),
    };
    return users[String(id)] || null;
  },

  login: async () => await fakeApi.me(),

  logout: async () => null,

  follow: async (id) => {
    const res = await fakeApi.getUserById(id);
    return { data: res.data };
  },

  unfollow: async () => null,

  signup: async () => ({ data: { id: 1, name: "New User" } }),

  changeNickname: async (data) => ({
    data: { nickname: data.nickname },
  }),
  search: async ({ type, query }) => {
      const lowerQuery = query.toLowerCase();
  
      const allData = {
        hashtag: [
          { id: 1, name: "#여름", type: "hashtag" },
          { id: 2, name: "#가을", type: "hashtag" },
        ],
        category: [
          { id: 3, name: "아우터", type: "category" },
          { id: 4, name: "셔츠", type: "category" },
        ],
        brand: [
          { id: 5, name: "무신사", type: "brand" },
          { id: 6, name: "지오다노", type: "brand" },
        ],
      };
  
      // 실제 검색 결과 생성
      const results = allData[type]
        .filter((item) => item.name.toLowerCase().includes(lowerQuery))
        .map((item) => ({
          ...item,
          relatedPosts: [
            {
              id: 100,
              content: `${item.name} 관련 게시물 예시`,
              Images: [{ id: 1, src: '/images/sample.jpg' }],
            },
          ],
        }));
  
      return { data: results };
    },
  };
  
export const initialUserProfile = {
    id: null,
    nickname: null,
    email: null,
    profileImageUrl: null,
    Posts: [],       
    Followings: [], 
    Followers: [],    
  };

const initialState = {
  isLoggedIn: false,
  me: null,
  userProfile: initialUserProfile,
  posts: [],
  bookmarkedPosts: [],
  likedPosts: [], // 좋아요한 게시글
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  savedItems: [], // 옷장 아이템
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
  unfollowLoading: false,//언팔로우 시도중
  unfollowDone: false,
  unfollowError: null,
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,

};

export const logIn = createAsyncThunk('user/logIn', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/user/login', data); // ✅ 이렇게
    console.log("로그인 API 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("로그인 에러 발생:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message);
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
    const response = await fakeApi.follow(userId); // ✅ 전체 유저 정보 받음
    return response.data; // ✅ UserId 말고 유저 객체 전체 반환
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

//현재 로그인된 유저의 팔로잉 목록을 불러오는 함수
export const loadFollowings = createAsyncThunk(
  'user/loadFollowings',
  async (_, thunkAPI) => {
    try {
      const me = await fakeApi.me();
      return { Followings: me.data.Followings };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// 현재 로그인된 유저의 팔로워 목록을 불러오는 함수
export const loadFollowers = createAsyncThunk(
  'user/loadFollowers',
  async (_, thunkAPI) => {
    try {
      const me = await fakeApi.me();
      return { Followers: me.data.Followers };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// /현재 로그인한 사용자(me)의 정보를 가져옴
export const loadMyInfo = createAsyncThunk(
  'user/loadMyInfo',
  async (_, thunkAPI) => {
    try {
      const me = await fakeApi.me();
      return me.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//특정 유저의 정보를 가져옴.data는 해당 유저의 userId.예: 프로필 페이지에 들어갈 때 GET /user/5 호출해서 해당 유저 정보 받아옴
export const loadUser = createAsyncThunk(
  'user/loadUser',
  async (userId, thunkAPI) => {
    try {
      const user = await fakeApi.getUserById(userId);
      if (!user) throw new Error('User not found');
      return user.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)
export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/user/profile/${id}`); 
    console.log("프로필 응답:", response.data);
    return response.data; // 여기에는 Posts, Followings, Followers 다 포함됨
  } catch (error) {
    console.error("프로필 불러오기 실패:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMe: (draft ,action) => {
      draft.me = action.payload;
      draft.isLoggedIn = !!action.payload;
    },
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
      // .addCase(HYDRATE, (draft, action) => {
      //   return {
      //     ...draft,
      //     ...action.payload.user,
      //   };
      // })
      .addCase(HYDRATE, (state, action) => {
        // ✅ HYDRATE 시에도 클라이언트 상태 유지
        if (action.payload.user.me !== null) {
          state.me = action.payload.user.me;
          state.isLoggedIn = !!action.payload.user.me;
        }
      })
      .addCase(logIn.pending, (draft) => {
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
      })
      .addCase(logIn.fulfilled, (draft, action) => {
       // console.log("Payload from API:", action.payload); 
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
        console.log("💬 FOLLOW 응답 유저 데이터:", action.payload);
      
        draft.followLoading = false;
        if (draft.me) {
          const alreadyFollowing = draft.me.Followings.find((u) => u.id === action.payload.id);
          if (!alreadyFollowing) {
            // 🔥 Posts가 빠졌다면, 여기서 보완해야 함!
            draft.me.Followings.push(action.payload);
          }
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
      .addCase(likePost.pending, (draft, action) => {
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
      })
      // .addCase(likePost.fulfilled, (draft, action) => {
      //   if (!draft.likedPosts) draft.likedPosts = []; // 안전장치
      //   draft.likedPosts.push(action.payload);
        
      //   // if (!draft.me) draft.me = { likedPosts: [] };
      //   // if (!draft.me.likedPosts) draft.me.likedPosts = [];
      
      //   // const exists = draft.me.likedPosts.find((p) => p.id === action.payload.id);
      //   // if (!exists) {
      //   //   draft.me.likedPosts.unshift(action.payload); // 좋아요 추가
      //   // }
      // })
      .addCase(likePost.fulfilled, (draft, action) => {
        if (!draft.likedPosts) draft.likedPosts = [];
        draft.likedPosts.push(action.payload);
      
        if (!draft.me) draft.me = { likedPosts: [] };
        if (!draft.me.likedPosts) draft.me.likedPosts = [];
      
        const exists = draft.me.likedPosts.find((p) => p.id === action.payload.id);
        if (!exists) {
          draft.me.likedPosts.push(action.payload);
        }
      })
      .addCase(likePost.rejected, (draft, action) => {
        draft.likePostLoading = false;
        draft.likePostError = action.error;
      })
      .addCase(unlikePost.pending, (draft, action) => {
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
      })
      .addCase(unlikePost.fulfilled, (draft, action) => {
        if (!draft.me?.likedPosts) return;
        draft.me.likedPosts = draft.me.likedPosts.filter((p) => p.id !== action.payload);
      })

      .addCase(unlikePost.rejected, (draft, action) => {
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
      })
      .addCase(bookmark.fulfilled, (draft, action) => {
        if (!draft.me) {
          draft.me = { bookmarkedPosts: [] }; // ✅ me 자체가 없을 경우 대비
        }
      
        if (!draft.me.bookmarkedPosts) {
          draft.me.bookmarkedPosts = []; // ✅ bookmarkedPosts가 없을 경우 대비
        }
      
        const exists = draft.me.bookmarkedPosts.find((p) => p.id === action.payload.id);
        if (!exists) {
          draft.me.bookmarkedPosts.unshift(action.payload); // ✅ 안전하게 추가
        }
      })
      .addCase(unbookmark.fulfilled, (draft, action) => {
        draft.me.bookmarkedPosts = draft.me.bookmarkedPosts.filter(
          (p) => p.id !== action.payload
        )
      })
      .addCase(loadPost.fulfilled, (draft, action) => {
        const post = action.payload;
    
        // me가 없으면 중단
        if (!draft.me || !Array.isArray(draft.me.Followings)) return;
    
        // Followings 중 post 작성자를 찾음
        const writer = draft.me.Followings.find((f) => f.id === post.User.id);
        if (!writer) return;
    
        if (!Array.isArray(writer.Posts)) {
          writer.Posts = [];
        }
    
        const already = writer.Posts.find((p) => String(p.id) === String(post.id));
        if (!already) {
          writer.Posts.push(post);
        }
      })
      .addCase(fetchUserProfile.pending, (draft) => {
       
      })
      .addCase(fetchUserProfile.fulfilled, (draft, action) => {
        draft.userProfile = {
          id: action.payload.id,
          nickname: action.payload.nickname,
          email: action.payload.email,
          profileImageUrl: action.payload.profileImageUrl,
          Posts: action.payload.Posts || [],
          Followings: action.payload.Followings || [],
          Followers: action.payload.Followers || [],
        };
      })
      .addCase(fetchUserProfile.rejected, (draft, action) => {
        console.error('userProfile 로드 실패', action.payload);
      });
  },
});
export const { setMe,setLogOutLoading,addPostToMe,removePostOfMe, setPosts  } = userSlice.actions;

export default userSlice.reducer;

/*            .addCase(bookmark.pending, (draft, action) => {
        draft.bookmarkLoading = true;
        draft.bookmarkDone = false;
        draft.bookmarkError = null;
      })
      .addCase(bookmark.fulfilled, (draft, action) => {
        draft.bookmarkLoading = false;
        draft.bookmarkDone = true;
        console.log('✅ fulfilled payload:', action.payload); // 여기에서도 찍어보기

        draft.bookmarkedPosts.unshift(action.payload);
      })
      .addCase(bookmark.rejected, (draft, action) => {
        draft.bookmarkLoading = false;
        draft.bookmarkError = action.error;
      })
      .addCase(unbookmark.pending, (draft) => {
        draft.bookmarkLoading = true;
        draft.bookmarkDone = false;
        draft.bookmarkError = null;
      })
      .addCase(unbookmark.fulfilled, (draft, action) => {
        draft.bookmarkedPosts = draft.bookmarkedPosts.filter(
          (post) => String(post.id) !== String(action.payload.postId)
        );
      })
      .addCase(unbookmark.rejected, (draft, action) => {
        draft.bookmarkError = action.payload || action.error.message;
      })*/