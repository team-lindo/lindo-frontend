import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { bookmark, unbookmark,loadPost,likePost,unlikePost,posts } from "./post";
import axiosInstance from '../api/axiosInstance'; 
import {initialClothes}from "./product";
// 이미지 하나에 태깅된 옷 1개 생성
const generateTaggedProduct = () => {
  const outerItems = initialClothes["outer"];
  const selected = outerItems[Math.floor(Math.random() * outerItems.length)];

  return {
    uid: selected.uid,
    url: selected.url,
    name: selected.name,
    price: selected.price,
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
  };
};
export const dummyPosts = [
  {
    id: 1,
    content: "여름엔 이거지",
    Images: [{ id: 1, src: "/images/test.jpg" }],
    taggedProductsByImage: {
      1: [
        {
          uid: 'a1',
          name: '봄 코트',
          price: 89000,
          size: 'L',
          url: '/images/coat1.jpg',
          x: 50,
          y: 30,
        },
      ],
    },
  },
  {
    id: 2,
    content: "겨울엔 따뜻하게",
    Images: [{ id: 2, src: "/images/test2.jpg" }],
    taggedProductsByImage: {
      2: [
        {
          uid: 'a2',
          name: '코트',
          price: 97000,
          url: '/images/coat2.jpg',
          x: 20,
          y: 60,
        },
      ],
    },
  },
  {
    id: 3,
    content: "자켓으으로 멋내기",
    Images: [{ id: 3, src: "/images/test3.jpg" }],
    taggedProductsByImage: {
      3: [
        {
          uid: 'a1',
          name: '자켓',
          price: 189000,
          url: '/images/jacket1.jpg',
          x: 80,
          y: 20,
        },
      ],
    },
  },
  {
    id: 4,
    content: "롱 코트로 멋내기",
    Images: [{ id: 3, src: "/images/test1.jpg" }],
    taggedProductsByImage: {
      3: [
        {
          uid: 'a4',
          name: '여름 자켓',
          price: 89000,
          url: '/images/jacket2.jpg',
          x: 80,
          y: 20,
        },
      ],
    },
  },
];

//Images 배열에서 taggedProductsByImage 자동 생성
// export const getTaggedProductsByImage = (images) => {
//   const result = {};
//   for (const image of images) {
//     result[image.id] = [
//       generateTaggedProduct(), // 이미지당 1개만 태그 (원하면 여러 개도 가능)
//     ];
//   }
//   return result;
// };
const getTaggedProductsByImage = (images) => {
  // 적절한 mock 데이터 생성
  return images.reduce((acc, img) => {
    acc[img.id] = [
      {
        uid: "product-1",
        name: "샘플 상품",
        price: 10000,
        position: { x: 50, y: 50 },
      },
    ];
    return acc;
  }, {});
};
export const fetchPostsByTaggedProduct = createAsyncThunk(
  'post/fetchPostsByTaggedProduct',
  async (uid, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/api/products/${uid}/posts`);
      return response.data; // 게시글 배열
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const images = [{ id: 1, src: "/images/test.jpg" }];
const images2 = [{ id: 2, src: "/images/test2.jpg" }];
const images3 = [{ id: 3, src: "/images/test3.jpg" }];
const images5 = [{ id: 5, src: "/images/test1.jpg" }];


export const fakeApi = {
  me: async () => {
    const posts = [
      {
        id: 1,
        content: "test의 게시물 #여름 #반팔",
        Images: images,
        thumbnail: images[0].src,
        hashtags: ["여름", "반팔"],
        taggedProductsByImage: getTaggedProductsByImage(images),
      },
    ];
  
    const followings = [
      {
        id: 2,
        nickname: "test2",
        Posts: [
          {
            id: 2,
            content: "test2의 게시물",
            Images: images2,
            thumbnail: images2[0].src,
            hashtags: [],
            taggedProductsByImage: getTaggedProductsByImage(images2),
          },
        ],
      },
      {
        id: 3,
        nickname: "test3",
        Posts: [
          {
            id: 3,
            content: "test3의 게시물",
            Images: images3,
            thumbnail: images3[0].src,
            hashtags: [],
            taggedProductsByImage: getTaggedProductsByImage(images3),
          },
        ],
      },
      {
        id: 5,
        nickname: "test1",
        Posts: [
          {
            id: 5,
            content: "test1의 게시물 #봄 #가을",
            Images: images5,
            thumbnail: images5[0].src,
            hashtags: ["봄", "가을"],
            taggedProductsByImage: getTaggedProductsByImage(images5),
          },
        ],
      },
    ];
  
    const followers = [
      { id: 2, nickname: "test2" },
      { id: 3, nickname: "test3" },
      { id: 4, nickname: "test4" },
      { id: 5, nickname: "test1" },
    ];
  
    return {
      data: {
        id: 1,
        nickname: "test",
        email: "test@example.com",
  
        Posts: posts,
        Followers: followers,
        Followings: followings,
  
        postsCount: posts.length,
        followersCount: followers.length,
        followingsCount: followings.length,
  
        savedItems: [
          { id: 1, name: '청바지', imageUrl: '/images/jeans1.jpg' },
          { id: 2, name: '셔츠', imageUrl: '/images/knit1.jpg' },
        ],
        likedPosts: [],
        bookmarkedPosts: [],
      }
    };
  },
  
  getProductById: async (uid) => {
    const found = initialClothes["outer"].find((p) => p.uid === uid); // ✅ 여기가 핵심
    return {
      data: found ?? {
        uid,
        name: '알 수 없음',
        price: 0,
        url: '/default-image.png',
      },
    };
  },
  getPostsByTaggedProduct: async (uid) => {
    const matchedPosts = dummyPosts.filter((post) =>
      Object.values(post.taggedProductsByImage || {}).some((tags) =>
        tags.some((tag) => tag.uid === uid)
      )
    );

    return { data: matchedPosts };
  },
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
          thumbnail: "/images/test1.jpg",
        },
      ],
      Followings: [
        {
          id: 1,
          nickname: "test",
          content:  "test의 게시물 #여름 #반팔" ,
          Images: [{ id: 11, src: "/images/test1.jpg" }],
          thumbnail: "/images/test1.jpg",
        },
      ],
      Followers: [{ id: 1, nickname: "test" }],
    },
  }),

  getUserById: async (id) => {
    const users = {
      1: await fakeApi.me(), // 로그인 유저
      2: {
        data: {
          id: 2,
          nickname: "test2",
      
          Posts: [
            {
              id: 2,
              content: "test2의 게시물",
              Images: [{ id: 2, src: "/images/test2.jpg" }],
              thumbnail: "/images/test2.jpg",
            },
          ],
          closetItems: [
            { id: 1, name: "아우터", imageUrl: "/images/coat1.jpg" },
          ],
        },
      },
      3: {
        data: {
          id: 3,
          nickname: "test3",
          Posts: [
            {
              id: 3,
              content: "test3의 게시물",
              Images: [{ id: 3, src: "/images/test3.jpg" }],
              thumbnail: "/images/test3.jpg",
            },
          ],
          closetItems: [],
        },
      },
      5: await fakeApi.test1(),
    };
  
    return users[String(id)] || null;
  },
  

  login: async () => await fakeApi.me(),

  logout: async () => null,

  follow: async (id) => {
    const target = await fakeApi.getUserById(id);
    return {
      data: {
        id: 1, // 내 ID
        followedUser: {
          id: target.data.id,
          nickname: target.data.nickname,
        },
        followingsCount: 4, // ex. 현재 followings 수
        followersCount: 5,  // ex. 현재 followers 수
      },
    };
  },
  
  unfollow: async (id) => {
    return {
      data: {
        id: 1,
        unfollowedUserId: id,
        followingsCount: 2,
        followersCount: 4,
      },
    };
  },
  

  signup: async () => ({ data: { id: 1, name: "New User" } }),

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
   
postsCount: 0,
closetItems: [],     // 해당 유저의 옷장 아이템들
  };

const initialState = {
  isLoggedIn: false,
  me: null,
  accessToken: null,
  followingsCount: 0,
  followersCount: 0,
  followingsList: [],
  followersList: [],
  //userProfile: initialUserProfile,
  profileUser: initialUserProfile,
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

};

export const logIn = createAsyncThunk('user/logIn', async (_, { rejectWithValue }) => {
  try {
    const response = await fakeApi.login();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logOut = createAsyncThunk('user/logOut', async (_, { rejectWithValue }) => {
  try {
    const response = await fakeApi.logout();
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const follow = createAsyncThunk('user/follow', async (id, { rejectWithValue }) => {
  try {
    const response = await fakeApi.follow(id);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const unfollow = createAsyncThunk('user/unfollow', async (id, { rejectWithValue }) => {
  try {
    const response = await fakeApi.unfollow(id);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const signup = createAsyncThunk('user/signup', async (_, { rejectWithValue }) => {
  try {
    const response = await fakeApi.signup();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const loadFollowings = createAsyncThunk('user/loadFollowings', async (_, { rejectWithValue }) => {
  try {
    const me = await fakeApi.me();
    return { users: me.data.Followings, totalCount: me.data.Followings.length };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const loadFollowers = createAsyncThunk('user/loadFollowers', async (_, { rejectWithValue }) => {
  try {
    const me = await fakeApi.me();
    return { users: me.data.Followers, totalCount: me.data.Followers.length };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const loadMyInfo = createAsyncThunk('user/loadMyInfo', async (_, { rejectWithValue }) => {
  try {
    const response = await fakeApi.me();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async (id, { rejectWithValue }) => {
  try {
    const response = await fakeApi.getUserById(id);
    if (!response || !response.data) throw new Error("User not found");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
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
      console.log('Before Update:', [...draft.me.Posts]); // 상태 변경 전 디버깅
      draft.me.Posts.unshift(action.payload);
     // draft.me.Posts = [...draft.me.Posts, { id: action.payload }];
    
    // draft.me.Posts.unshift({ id: action.payload, content: action.payload.content  });
     console.log('After Update:', [...draft.me.Posts]); // 상태 변경 후 디버깅
    },
    //자기 게시물 삭제
    // removePostOfMe(draft, action) {
    //   draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.payload);
    // },
    
    // 전체 게시물 업데이트 -> 외부에서 받아온 게시글 배열을 state.posts에 저장하는 함수
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
        draft.me = action.payload.user;             // ✅ 유저 정보만 저장
        draft.isLoggedIn = true;
        draft.logInDone = true;
        draft.accessToken = action.payload.accessToken;

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
      
        const data = action.payload; // ✅ 먼저 선언
      
        draft.followLoading = false;
      
        if (draft.me) {
          const alreadyFollowing = draft.me.Followings.find(
            (u) => u.id === data.followedUser.id
          );
      
          if (!alreadyFollowing) {
            draft.me.Followings.push(data.followedUser); // ✅ followedUser만 추가
          }
      
          draft.me.followingsCount = data.followingsCount;
          draft.me.followersCount = data.followersCount;
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
        const data = action.payload;
      
        draft.unfollowLoading = false;
      
        if (draft.me) {
          // 1. Followings 배열에서 해당 유저 제거
          draft.me.Followings = draft.me.Followings.filter(
            (v) => v.id !== data.unfollowedUserId
          );
      
          // 2. 최신 카운트 값 반영
          draft.me.followingsCount = data.followingsCount;
          draft.me.followersCount = data.followersCount;
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
      .addCase(likePost.pending, (draft, action) => {
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
      })

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
        const { postId } = action.payload;
        if (!draft.me?.likedPosts) return;
        draft.me.likedPosts = draft.me.likedPosts.filter((p) => String(p.id) !== String(postId));
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
        const { postId } = action.payload;
      
        draft.me.bookmarkedPosts = draft.me.bookmarkedPosts.filter(
          (p) => String(p.id) !== String(postId)
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
        draft.profileUser = {
          id: action.payload.id,
          nickname: action.payload.nickname,
          profileImageUrl: action.payload.profileImageUrl,
          postCount: action.payload.postCount,
        };
        })
      
      .addCase(fetchUserProfile.rejected, (draft, action) => {
        console.error('userProfile 로드 실패', action.payload);
      })
      .addCase(loadMyInfo.fulfilled, (draft, action) => {
        
        draft.me = {
          id: action.payload.id,
          nickname: action.payload.nickname,
          email: action.payload.email,
          profileImageUrl: action.payload.profileImageUrl,
          postsCount: action.payload.postsCount ?? 0,
          followingsCount: action.payload.followingsCount ?? 0,
          followersCount: action.payload.followersCount ?? 0,
          Posts: action.payload.Posts ?? [],
        };
        draft.isLoggedIn = true;
      })
      
      .addCase(loadMyInfo.rejected, (draft, action) => {
        console.error('로그인 사용자 정보 불러오기 실패:', action.payload);
        draft.me = null;
      })
      .addCase(loadFollowers.fulfilled, (draft, action) => {
        //draft.Followers = action.payload;
        const { users, totalCount } = action.payload;

  draft.followersList.push(...users);
  draft.followersCount = totalCount; // ✅ totalCount 저장
      })
      .addCase(loadFollowers.rejected, (draft, action) => {
        console.error('팔로워 목록  불러오기 실패:', action.payload);
        draft.me = null;
      })
      .addCase(loadFollowings.fulfilled, (draft, action) => {
      //  draft.Followings = action.payload ;
      const { users, totalCount } = action.payload;

      draft.followingsList.push(...users);
      draft.followingsCount = totalCount; // ✅ totalCount 저장

      })
      .addCase(loadFollowings.rejected, (draft, action) => {
        console.error('팔로잉 목록  불러오기 실패:', action.payload);
        draft.me = null;
      })

      
  },
});
export const { setMe,setLogOutLoading,addPostToMe,removePostOfMe, setPosts  } = userSlice.actions;

export default userSlice.reducer;

