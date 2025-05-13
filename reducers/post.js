import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import shortId from 'shortid';
import { faker } from '@faker-js/faker';
import _ from 'lodash';
import { fakeApi,addPostToMe,fetchPostsByTaggedProduct ,getTaggedProductsByImage  } from './user';
/*export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map(() => {
      const content = faker.lorem.paragraph();

      const products = Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
        productName: faker.commerce.productName(),
        category: faker.commerce.department(),
        brand: faker.company.name(),
        price: faker.number.int({ min: 10000, max: 500000 }),
        size: `${faker.number.int({ min: 220, max: 300 })}mm`,
        siteUrl: faker.internet.url(),
        imageTag: faker.image.url(),
      }));

      // 기존 이미지 + 제품 이미지 정보 포함
      const images = [
        {
          src: faker.image.url() || "/default-image.png",
          fetchPriority: "auto",
          productInfo: "", // 일반 이미지에는 제품 정보 없음
          siteUrl: "",
        },
        ...products.map((product) => ({
          src: product.imageTag,
          fetchPriority: "auto",
          productInfo: `${product.brand} - ${product.productName} / ${product.price}원 / ${product.size}`,
          //siteUrl: product.siteUrl,
        })),
      ];

      return {
        id: shortId.generate(),
        User: {
          id: shortId.generate(),
          nickname: faker.person.fullName() || "익명 사용자",
        },
        content: content || "내용 없음",
        Images: images, // 기존 이미지 + 제품 이미지 포함
        Comments: [
          {
            User: {
              id: shortId.generate(),
              nickname: faker.person.fullName() || "익명 사용자",
            },
            content: faker.lorem.sentence() || "내용 없음",
          },
        ],
      };
    });
console.log("Generated Dummy Posts Array:", generateDummyPost(10)); 
*/

export const generateMinimalPosts = (count = 10 , userId,) =>
  Array(count).fill().map(() => ({
    id: shortId.generate(),
    thumbnail: faker.image.url() || '/default-thumbnail.png',
    userId,
  }));


export const initialState = {
  //게시글 작성마다 mainPosts 앞에 추가됨
  //댓글은 게시글의 id를 찾고 Comments로 접근함함
  mainPosts:  [],
  //mainPosts: generateDummyPost(10),  
  posts: [],
  taggedPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  bookmarkLoading: false,
  bookmarkDone: false,
  bookmarkError: null,
  fetchTaggedPostsLoading: false,
  fetchTaggedPostsError: null,
};


export const loadHashtagPosts = createAsyncThunk(
  'post/loadHashtagPosts',
  _.throttle(async ({ lastId, hashtag }, thunkAPI) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Fetching hashtag posts for: ${hashtag}, lastId: ${lastId}`);
        const dummyPosts = generateDummyPost(10);
        resolve({
          posts: dummyPosts,
          hasMorePosts: dummyPosts.length === 10, // 무한 스크롤 가능 여부 설정
        });
      }, 1000);
    });
  }, 5000) // 5초 동안 한 번만 실행
);

export const loadUserPosts = createAsyncThunk(
  'post/loadUserPosts',
  async ({ id }, thunkAPI) => {
    try {
      const res = await fakeApi.getUserById(id); // ✅ 해당 유저 데이터 가져오기
      const posts = res.data?.Posts || [];        // ✅ 그 유저의 게시글만 추출
      return {
        posts,
        hasMorePosts: false,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


  /*initialState.mainPosts = initialState.mainPosts.concat(
    Array(20).fill().map(() => {
      const content = faker.lorem.paragraph(); // faker 값 생성
      console.log('Generated Content:', content); // 디버그 로그
      return {
        id: shortId.generate(),
        User: {
          id: shortId.generate(),
          nickname: faker.person.fullName() || '익명 사용자',
        },
        content: content || '내용 없음', // 빈 값일 경우 기본값 설정
        Images: [
          {
            src: faker.image.url() || '/default-image.png', // 이미지 URL 기본값
          },
        ],
        Comments: [
          {
            User: {
              id: shortId.generate(),
              nickname: faker.person.fullName() || '익명 사용자',
            },
            content: faker.lorem.sentence() || '내용 없음', // 댓글 기본값
          },
        ],
      };
    })
  );
 */ 
  
  const fetchPosts = async (lastId, thunkAPI) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPosts = generateDummyPost(10);
        //console.log("Generated Dummy Posts:", newPosts); // ✅ 디버깅 로그 추가
        resolve({
          posts: newPosts,
          hasMorePosts: newPosts.length === 10,
        });
      }, 1000);
    });
  };
  
  const throttledFetchPosts = _.throttle(fetchPosts, 5000); 
  
  export const loadPosts = createAsyncThunk("post/loadPosts", async (lastId, thunkAPI) => {
    const result = await throttledFetchPosts(lastId, thunkAPI); 
   // console.log("Thunk Result:", result); 
    return result;
  });
  
  export const loadPost = createAsyncThunk('post/loadPost', async ({ id }, thunkAPI) => {
    try {
      // 모든 유저 검색
      const userIds = [1, 2, 3, 4,5]; // fakeApi에 등록된 사용자 ID
  
      for (const userId of userIds) {
        const res = await fakeApi.getUserById(userId);
        const user = res?.data;
        if (!user || !Array.isArray(user.Posts)) continue;
  
        const post = user.Posts.find((p) => String(p.id) === String(id));
        if (post) {
          return {
            ...post,
            User: {
              id: user.id,
              nickname: user.nickname,
            },
            Comments: [], // 댓글도 비워서 리턴
            Likers: [],
          };
        }
      }
  
      // 해당 post가 없을 경우
      return thunkAPI.rejectWithValue('해당 게시글을 찾을 수 없습니다.');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
  // export const loadPost = createAsyncThunk('post/loadPost', async (data, thunkAPI) => {
  //   try {
  //     const dummyPost = {
  //       id: data?.id ?? shortId.generate(), // id가 없으면 새로 생성
  //       User: {
  //         id: 1,
  //         nickname: 'test',
  //       },
  //       content: typeof data === 'object' ? data.content ?? '내용 없음' : data ?? '내용 없음', // 문자열/객체 모두 처리
  //       Images: Array.isArray(data?.Images) ? data.Images : [],
  //       Comments: Array.isArray(data?.Comments) ? data.Comments : [],
  //       Likers: Array.isArray(data?.Likers) ? data.Likers : [], // ✅ 이 줄 추가!

  //     };
  
  //     return dummyPost;
  //   } catch (error) {
  //     return thunkAPI.rejectWithValue(error.message);
  //   }
  // });
 /* export const addPost = createAsyncThunk('post/addPost', async (data, thunkAPI) => {
    try {
      console.log("🔍 Received data in addPost:", data);
  
      if (!data || typeof data !== "object") {
        throw new Error("Invalid data format: data must be an object.");
      }
  
      // 게시물 ID를 shortId로 유지
      const postId = data.id ? data.id : shortId.generate();
      
      // 사용자 정보 처리 
      if (!data.user || !data.user.id) {
        throw new Error("Invalid user data: user ID is required.");
      }
      // 사용자 정보 기본값 처리
      const user = {
        id: data.user.id,  
        nickname: data.user.nickname || "익명"
    };
      // 게시물 설명 기본값 처리
      // const postDescription = typeof data.description === "string" && data.description.trim() !== ""
      //   ? data.description
      //   : "설명이 없습니다.";
      const postContent = typeof data.description === "string" && data.description.trim() !== ""
    ? data.description
    : "설명이 없습니다.";

  
      // 이미지 배열 매핑
      const images = Array.isArray(data.images)
        ? data.images.map((src) => ({
            src,
            fetchPriority: "auto",
            productInfo: "", // 일반 이미지에는 제품 정보 없음
            siteUrl: "",
          }))
        : [];
  
      // 제품 정보 매핑
      const products = Array.isArray(data.products)
        ? data.products.map((product) => ({
            postId: postId,
            productId: product.productId || shortId.generate(), // productId 유지
            productName: product.productName || "알 수 없음",
            category: product.category || "기타",
            brand: product.brand || "브랜드 없음",
            price: product.price ?? 0,
            size: product.size || "사이즈 미정",
            description: product.description || "설명 없음",
            
            imageTag: product.imageTag || "",
            siteUrl: product.siteUrl || "",
          }))
        : [];
  
      // 제품 이미지 추가 (각 제품 이미지가 이미지 배열에도 포함되도록 설정)
      products.forEach((product) => {
        images.push({
          src: product.imageTag,
          fetchPriority: "auto",
          productInfo: `${product.brand} - ${product.productName} / ${product.price}원 / ${product.size}`,
          siteUrl: product.siteUrl,
        });
      });
  
      // 댓글 기본값 처리
      const comments = Array.isArray(data.comments)
        ? data.comments.map((comment) => ({
            id: shortId.generate(),
            User: { id: shortId.generate(), nickname: comment.nickname || "댓글 작성자" },
            content: comment.text || "내용 없음",
          }))
        : [];
  
      // 최종적으로 반환할 게시물 객체
      const newPost = {
        id: postId,
        User: user,
        //content: postDescription,
        content: postContent,
        Images: images,
        Comments: comments,
        products: products, // 기존 `productInfo` 대신 `products` 배열 유지
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
  
      console.log("Returning newPost:", newPost);
      return newPost;
    } catch (error) {
      console.error(" Error in addPost:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  });
  */
  export const addPost = createAsyncThunk('post/addPost', async (data, thunkAPI) => {
    try {
      if (!data || typeof data !== "object") {
        throw new Error("Invalid data format: data must be an object.");
      }
  
      const postId = data.id || shortId.generate();
      const user = data.user ?? { id: shortId.generate(), nickname: "익명" };
  
      const postContent =
        typeof data.content === "string" && data.content.trim() !== ""
          ? data.content
          : data.description?.trim() || "설명이 없습니다.";
  
      // ✨ 해시태그 추출
      const hashtags = postContent.match(/#[^\s#]+/g)?.map((tag) => tag.replace('#', '')) || [];
  
      // ✨ 이미지 처리 + 상품 태깅 매핑
      const images = Array.isArray(data.Images)
        ? data.Images.map((image) => ({
            src: image.src,
            fetchPriority: "auto",
            ProductInfo: image.ProductInfo || [], // 명세에 맞춰 수정
          }))
        : [];
  
      // ✨ 이미지별 태깅된 상품 매핑
      const taggedProductsByImage = data.taggedProductsByImage ?? {};
  
      const Comments = Array.isArray(data.comments)
        ? data.comments.map((comment) => ({
            id: shortId.generate(),
            User: {
              id: shortId.generate(),
              nickname: comment.nickname || "댓글 작성자",
            },
            content: comment.text || "내용 없음",
          }))
        : [];
  
      // ✅ 최종 게시글 객체 (서버에서 응답으로 줄 형식)
      const newPost = {
        id: postId,
        User: user,
        content: postContent,
        Images: images,
        Comments,
        hashtags,
        taggedProductsByImage,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
  
      thunkAPI.dispatch(addPostToMe(newPost));
      return newPost;
    } catch (error) {
      console.error("❌ Error in addPost:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  });
  

  export const addComment = createAsyncThunk('post/addComment', async (data, thunkAPI) => {
  try {
    const dummyComment = {
      id: shortId.generate(),
      User: {
        id: 2,
        nickname: 'dummy',
      },
      content: data.content,
    };

    return {
      postId: data.postId,
      comment: dummyComment,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const removePost = createAsyncThunk('post/removePost', async (postId, thunkAPI) => {
  try {
   // console.log('Attempting to remove post with ID:', postId);

    const dummyResponse = {
      message: 'Post removed successfully',
      removedPostId: postId,
    };

    // 실제 삭제가 가능한 ID인지 검증
    const draft = thunkAPI.getState();
    const postExists = draft.post.mainPosts.some((v) => String(v.id) === String(postId));

    if (!postExists) {
      throw new Error(`Post with ID ${postId} does not exist.`);
    }
    return {
      postId: dummyResponse.removedPostId,
      message: dummyResponse.message,
    };
    
  } catch (error) {
    console.error('Failed to remove post:', error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

// export const updatePost = createAsyncThunk('post/updatePost', async (data, thunkAPI) => {
//   try {
//     const updatedPost = {
//       PostId: data.PostId,
//       content: data.content,
//     };
//     return updatedPost;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (data, { rejectWithValue }) => {
    try {
      // 비동기 요청처럼 setTimeout 사용
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            PostId: data.PostId,
            content: data.content,
          });
        }, 500); // 0.5초 후 응답 (서버처럼 보이게)
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// export const likePost = createAsyncThunk('post/likePost', async (postId, { getState, rejectWithValue }) => {
//   try {
//     const state = getState(); // ✅ 여기서 state 선언
//     const me = state.user.me;
//     const post = state.post.mainPosts.find(p => p.id === postId);
    
//     // 예: 좋아요 정보 서버에 전달
//     return {
//       ...post,
//       PostId: postId,
//       UserId: me?.id,
//     };
//   } catch (err) {
//     return rejectWithValue(err.message);
//   }
// });
export const likePost = createAsyncThunk(
  'post/likePost',
  async (postId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
    //  const me = state.user.me;
      const post = state.post.mainPosts.find(p => String(p.id) === String(postId));

      if (!post) {
        throw new Error('post가 없습니다.');
      }
      // return {
      //  ...post,
      //   PostId: postId,
      //   thumbnail: post.thumbnail,
      // //  UserId: me.id,
      // };
      return {
        PostId: postId,
        id: post.id,
        content: post.content,
        thumbnail: post.thumbnail, // 게시글 대표 이미지 (있다면)
        Images: post.Images,       // 썸네일 대체용 (Images[0] 썸네일 사용 가능)
        createdAt: post.createdAt,
        User: post.User,           // 작성자 정보
      };
      
    } catch (err) {
      console.error('🔥 likePost error:', err);
      return rejectWithValue(err.message);
    }
  }
);


export const unlikePost = createAsyncThunk('post/unlikePost', async (postId, thunkAPI) => {
  try {
    // 단순히 postId만 넘기면 충분 (지울 때는 ID만 있으면 됨)
    return { PostId: postId };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// export const likePost = createAsyncThunk('post/likePost', async (data, thunkAPI) => {
//   try {
//     const likedPost = {
//       PostId: data,
//       UserId: 1, // 예제 사용자 ID
//     };
//     return likedPost;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

// export const unlikePost = createAsyncThunk('post/unlikePost', async (data, thunkAPI) => {
//   try {
//     const unlikedPost = {
//       PostId: data,
//       UserId: 1, // 예제 사용자 ID
//     };
//     return unlikedPost;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

export const uploadImage = createAsyncThunk('post/uploadImage', async (data, thunkAPI) => {
  try {
    const uploadedImages = [
      { id: shortId.generate(), src: '/dummy-image.png' }, // 더미 이미지 데이터
    ];
    return uploadedImages;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const bookmark = createAsyncThunk('post/bookmark', async (post, thunkAPI) => {
  try {
    if (!post || !post.content) {
      throw new Error('Invalid post data');
    }

    const bookmarkedPost = {
      id: shortId.generate(),
      content: `RT: ${post.content}`,
      User: {
        id: shortId.generate(),
        nickname: post.User?.nickname || '북마크 사용자',
      },
      Images: post.Images || [],
      Comments: [],
    };
    return bookmarkedPost;
  } catch (error) {
    console.error('❌ bookmark thunk 오류:', error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const unbookmark = createAsyncThunk( 'post/unbookmark', async (postId, thunkAPI) => {
    try {
    /*   const state = thunkAPI.getState();
     const isBookmarked = state.post.bookmarkedPosts.some(
        (post) => String(post.id) === String(postId)
      );
      if (!isBookmarked) {
        throw new Error(`Post with ID ${postId} is not bookmarked.`);
      }*/

      const dummyResponse = {
        message: 'Post unbookmarked successfully',
        postId,
      };

      return dummyResponse;
    } catch (error) {
      console.error('Failed to unbookmark post:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// export const fetchPostsByTaggedProduct = createAsyncThunk(
//   'post/fetchPostsByTaggedProduct',
//   async (uid, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`/api/products/${uid}/posts`);
//       return response.data; // Array<Post>
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
export const fetchPostsByTaggedProductThunk = createAsyncThunk(
  'post/fetchPostsByTaggedProduct',
  async (uid, { rejectWithValue }) => {
    try {
      const response = await fakeApi.fetchPostsByTaggedProduct(uid);
      return response.data; // Array of posts
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    removeImage(draft, action) {
      draft.imagePaths = draft.imagePaths.filter((_, i) => i !== action.payload);
    },
    resetAddPostDone(draft) {
      draft.addPostDone = false; // 상태 초기화
    },
    addPostToMainPosts: (draft, action) => {
      const exists = draft.mainPosts.find((v) => String(v.id) === String(action.payload.id));
      if (!exists) {
        draft.mainPosts.push(action.payload);
      }}
  },
  extraReducers: (builder) => {
    builder
     /* .addCase(HYDRATE, (draft, action) => {
        draft.mainPosts = [...draft.mainPosts, ...action.payload.post.mainPosts];
      })
        */
    /*  .addCase(HYDRATE, (draft, action) => {
        console.log('HYDRATE Payload:', action.payload);
      
        draft.mainPosts = Array.isArray(action.payload.post?.mainPosts)
          ? [...action.payload.post.mainPosts]
          : draft.mainPosts;
      })*/
          .addCase(HYDRATE, (draft, action) => {
           // console.log("HYDRATE Payload:", action.payload);
          
            if (!action.payload.post || !Array.isArray(action.payload.post.mainPosts)) {
              console.warn("HYDRATE action.payload.post is undefined or invalid. Keeping existing state.");
              return;
            }
          
            draft.mainPosts = [...action.payload.post.mainPosts];
          })
          
      .addCase(loadPost.pending, (draft, action) => {
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
      })
      // .addCase(loadPost.fulfilled, (draft, action) => {
      //   draft.loadPostLoading = false;
      //   draft.loadPostDone = true;
      //  // draft.singlePost = action.payload;
      //  const already = draft.mainPosts.find((p) => String(p.id) === String(action.payload.id));
      //  if (!already) {
      //    draft.mainPosts.unshift(action.payload); // 앞에 추가
      //  }
      // })
      .addCase(loadPost.fulfilled, (draft, action) => {
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
      
        const post = action.payload;
      
        // 이미지가 있고, taggedProductsByImage가 없다면 생성
        if (post.Images && !post.taggedProductsByImage) {
          post.taggedProductsByImage = getTaggedProductsByImage(post.Images);
        }
      
        // singlePost에 저장
        draft.singlePost = action.payload      
        // mainPosts에 이미 없으면 추가
        const already = draft.mainPosts.find((p) => String(p.id) === String(post.id));
        if (!already) {
          draft.mainPosts.unshift(post);
        }
      })
      .addCase(loadPost.rejected, (draft, action) => {
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
      })
      .addCase(loadPosts.pending, (draft, action) => {
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
      })
      .addCase(loadPosts.fulfilled, (draft, action) => {
       // console.log("loadPosts.fulfilled payload:", action.payload);
        if (!action.payload || !Array.isArray(action.payload.posts)) {
          console.error("Error: loadPosts returned invalid data", action.payload);
          return;
        }
       
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = [...draft.mainPosts, ...action.payload.posts]; // 기존 데이터 유지하며 새 데이터 추가
        draft.hasMorePosts = action.payload.hasMorePosts; // 무한 스크롤링 가능 여부 설정
      })
      
      .addCase(loadPosts.rejected, (draft, action) => {
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
      })
      .addCase(loadUserPosts.pending, (draft, action) => {
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
      })
      .addCase(loadUserPosts.fulfilled, (draft, action) => {
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.payload);
        draft.posts = action.payload.posts;
        console.log('✅ 게시글 응답:', action.payload);

        draft.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadUserPosts.rejected, (draft, action) => {
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
      })
      .addCase(loadHashtagPosts.pending, (draft, action) => {
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
      })
      .addCase(loadHashtagPosts.fulfilled, (draft, action) => {
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.payload);
        draft.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadHashtagPosts.rejected, (draft, action) => {
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
      })
      .addCase(addPost.pending, (draft) => {
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
      })
      .addCase(addPost.fulfilled, (draft, action) => {
        console.log(" Redux addPost fulfilled:", action.payload);
      
        draft.addPostLoading = false;
        draft.addPostDone = true;
        // const content = action.payload?.text?.description || action.payload?.content || " 기본값: 내용 없음";
      
        // console.log(" 최종 저장할 content 값:", content); //  Redux 저장 전에 확인
        const content = action.payload?.content || "내용 없음";
        console.log("최종 저장할 content 값:", content);
        const products = Array.isArray(action.payload.products) ? action.payload.products : [];

 
        // 게시물 추가 (content와 productInfo는 별도 저장)
        draft.mainPosts.unshift({
          ...action.payload,
          content: content, // content는 description 또는 기본값을 사용
          productInfo:products,
        });
      
        console.log(' Updated Redux mainPosts:', draft.mainPosts);
      })
      
  
      .addCase(addPost.rejected, (draft, action) => {
        draft.addPostLoading = false;
        draft.addPostError = action.error.message;
      })
      .addCase(addComment.pending, (draft) => {
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
      })
      .addCase(addComment.fulfilled, (draft, action) => {
        const post = draft.mainPosts.find((v) => String(v.id) === String(action.payload.postId)); // postId 사용
      
        if (!post) {
          console.error(`Post with ID ${action.payload.postId} not found.`);
          return;
        }
      
        if (!Array.isArray(post.Comments)) {
          post.Comments = []; // 댓글 배열이 없으면 초기화
        }
      
        post.Comments.unshift(action.payload.comment);
      
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
     
        //console.log('Action Payload:', action.payload);
        //console.log('Main Posts:', draft.mainPosts);
        if (!post) {
          console.error('Post not found:', action.payload.PostId);
        } else {
          //console.log('Found Post:', post);
        }
      })
      
      .addCase(addComment.rejected, (draft, action) => {
        draft.addCommentLoading = false;
        draft.addCommentError = action.error.message;
      })
      .addCase(removePost.pending, (draft, action) => {
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
      })
      .addCase(removePost.fulfilled, (draft, action) => {
        //console.log('Before removing post:', draft.mainPosts);

        draft.removePostLoading = false;
        draft.removePostDone = true;
      
        // mainPosts가 배열이 아닌 경우 초기화
        if (!Array.isArray(draft.mainPosts)) {
          console.error('mainPosts is not an array or is undefined. Initializing to an empty array.');
          draft.mainPosts = [];
        }
      
        //  mainPosts에서 postId와 일치하는 게시물 제거
        draft.mainPosts = draft.mainPosts.filter((v) => String(v.id) !== String(action.payload.postId));
         //console.log('After removing post:', draft.mainPosts);
      //  me.Posts에서도 제거 (로그인 유저의 게시물 목록)
      if (draft.me?.Posts) {
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== postId);
      }
            })
  
      .addCase(removePost.rejected, (draft, action) => {
        console.error('게시글 삭제 실패:', action.payload);
        draft.removePostLoading = false;
        draft.removePostError = action.error;
      })
      .addCase(updatePost.pending, (draft, action) => {
        draft.updatePostLoading = true;
        draft.updatePostDone = false;
        draft.updatePostError = null;
      })
      .addCase(updatePost.fulfilled, (draft, action) => {
        draft.updatePostLoading = false;
        draft.updatePostDone = true;
        //draft.mainPosts.find((v) => v.id === action.payload.PostId).content = action.payload.content;
        const post = draft.mainPosts.find((v) => v.id === action.payload.PostId);
        if (post) {
          post.content = action.payload.content;
        }
        
      })
      .addCase(updatePost.rejected, (draft, action) => {
        draft.updatePostLoading = false;
        draft.updatePostError = action.error;
      }) 

      .addCase(uploadImage.pending, (draft, action) => {
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
      })
      .addCase(uploadImage.fulfilled, (draft, action) => {
        draft.imagePaths = draft.imagePaths.concat(action.payload);
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
      })
      .addCase(uploadImage.rejected, (draft, action) => {
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
      })
      .addCase(fetchPostsByTaggedProductThunk.pending, () => {
        draft.fetchTaggedPostsLoading = true;
        draft.fetchTaggedPostsError = null;
      })
      .addCase(fetchPostsByTaggedProductThunk.fulfilled, (draft, action) => {
        draft.fetchTaggedPostsLoading = false;
        draft.taggedPosts = action.payload;
      })
      .addCase(fetchPostsByTaggedProductThunk.rejected, (draft, action) => {
        draft.fetchTaggedPostsLoading = false;
        draft.fetchTaggedPostsError = action.payload;
      })
  },
})

export const { removeImage, resetAddPostDone,addPostToMainPosts } = postSlice.actions;
export default postSlice.reducer;