import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import shortId from 'shortid';
import { faker } from '@faker-js/faker';
import _ from 'lodash';

export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map(() => {
      const content = faker.lorem.paragraph(); // faker 값 생성
    //  console.log("Generated Content:", content); 
      return {
        id: shortId.generate(),
        User: {
          id: shortId.generate(),
          nickname: faker.person.fullName() || "익명 사용자",
        },
        content: content || "내용 없음",
        Images: [
          {
            src: faker.image.url() || "/default-image.png",
            fetchPriority: "auto", // "high", "low", "auto" 가능

          },
        ],
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

//console.log("Generated Dummy Posts Array:", generateDummyPost(10)); 
export const initialState = {
  //게시글 작성마다 mainPosts 앞에 추가됨
  //댓글은 게시글의 id를 찾고 Comments로 접근함함
 // mainPosts:  [],
  mainPosts: generateDummyPost(10),  
 //posts: [],
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
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
};


export const loadHashtagPosts = createAsyncThunk(
  'post/loadHashtagPosts',
  _.throttle(async ({ lastId, tag }, thunkAPI) => {
    return new Promise((resolve) => {
      setTimeout(() => {
      //  console.log(`Fetching hashtag posts for: ${tag}, lastId: ${lastId}`);
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
  _.throttle(async ({ lastId, id }, thunkAPI) => {
    return new Promise((resolve) => {
      setTimeout(() => {
      //  console.log(`Fetching user posts for userId: ${id}, lastId: ${lastId}`);
        const dummyPosts = generateDummyPost(10);
        resolve({
          posts: dummyPosts,
          hasMorePosts: dummyPosts.length === 10, 
        });
      }, 1000);
    });
  }, 5000) 
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
  

  export const loadPost = createAsyncThunk('post/loadPost', async (data, thunkAPI) => {
    try {
      const dummyPost = {
        id: data?.id ?? shortId.generate(), // id가 없으면 새로 생성
        User: {
          id: 1,
          nickname: 'test',
        },
        content: typeof data === 'object' ? data.content ?? '내용 없음' : data ?? '내용 없음', // 문자열/객체 모두 처리
        Images: Array.isArray(data?.Images) ? data.Images : [],
        Comments: Array.isArray(data?.Comments) ? data.Comments : [],
      };
  
      return dummyPost;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
  export const addPost = createAsyncThunk('post/addPost', async (data, thunkAPI) => {
    //console.log(" Received data:", JSON.stringify(data, null, 2)); 
  
    try {
      if (!data || typeof data !== "object") {
        throw new Error(" Invalid data format: data must be an object.");
      }
  
      if (!data || !data.userId) {
        console.warn(" Warning: data.userId is undefined. Using default value 1.");
      }
      
      if (!data.text || typeof data.text !== "object") {
        console.warn(" Warning: data.text is missing or not an object. Using default content.");
      }
  
      const dummyPost = {
        id: typeof data.id === "string" || typeof data.id === "number" ? data.id : shortId.generate(),
        User: {
          id: typeof data.userId === "number" ? data.userId : 1, // userId를 number로 강제 변환
          nickname: typeof data.nickname === "string" ? data.nickname : "test",
        },
        content: typeof data?.text?.description === "string" ? data.text.description : " 기본값: 내용 없음",
        Images: Array.isArray(data?.images) ? data.images : [],
        Comments: Array.isArray(data?.comments) ? data.comments : [],
      };
  
      //console.log(" Generated dummyPost:", JSON.stringify(dummyPost, null, 2));
  
      return dummyPost;
    } catch (error) {
      //console.error(" Error in addPost:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  });
  
  
/*export const addPost = createAsyncThunk('post/addPost', async (data, thunkAPI) => {
  try {
    const dummyPost = {
      id: data?.id ?? shortId.generate(),
      User: {
        id: 1,
        nickname: 'test',
      },
      //content: data,
      content: typeof data === 'string' ? data : data?.content ?? '내용 없음', // 🔥 문자열이면 그대로 사용

      Images: [],
      Comments: [],
    };
    return dummyPost;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
*/
export const addComment = createAsyncThunk('post/addComment', async (data, thunkAPI) => {
  try {
    const dummyComment = {
      id: shortId.generate(),
      User: {
        id: 2,
        nickname: '삼색이',
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


export const updatePost = createAsyncThunk('post/updatePost', async (data, thunkAPI) => {
  try {
    const updatedPost = {
      PostId: data.PostId,
      content: data.content,
    };
    return updatedPost;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const likePost = createAsyncThunk('post/likePost', async (data, thunkAPI) => {
  try {
    const likedPost = {
      PostId: data,
      UserId: 1, // 예제 사용자 ID
    };
    return likedPost;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const unlikePost = createAsyncThunk('post/unlikePost', async (data, thunkAPI) => {
  try {
    const unlikedPost = {
      PostId: data,
      UserId: 1, // 예제 사용자 ID
    };
    return unlikedPost;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

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

export const retweet = createAsyncThunk('post/retweet', async (data, thunkAPI) => {
  try {
    const retweetedPost = {
      id: shortId.generate(),
      content: `RT: ${data.content}`,
      User: {
        id: shortId.generate(),
        nickname: '리트윗 사용자',
      },
      Images: data.Images || [],
      Comments: [],
    };
    return retweetedPost;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


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
      .addCase(loadPost.fulfilled, (draft, action) => {
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = action.payload;
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
              const content = action.payload?.text?.description || action.payload?.content || "🚨 기본값: 내용 없음";
      
        console.log("🔍 최종 저장할 content 값:", content); // ✅ Redux 저장 전에 확인
      
        const productInfo = {
          productName: action.payload?.productName || '알 수 없음',
          category: action.payload?.category || '기타',
          brand: action.payload?.brand || '브랜드 없음',
          price: action.payload?.price ?? 0,
          size: action.payload?.size || '사이즈 미정',
          site: action.payload?.site || '사이트 없음',
          writer: action.payload?.writer || '작성자 없음',
        };
      
        // 게시물 추가 (content와 productInfo는 별도 저장)
        draft.mainPosts.unshift({
          ...action.payload,
          content: content, // content는 description 또는 기본값을 사용
          productInfo: productInfo,
        });
      
        console.log('🛠 Updated Redux mainPosts:', draft.mainPosts);
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
      
        // postId와 일치하는 게시물 제거
        draft.mainPosts = draft.mainPosts.filter((v) => String(v.id) !== String(action.payload.postId));
      
        //console.log('After removing post:', draft.mainPosts);
      })
      
      
      .addCase(removePost.rejected, (draft, action) => {
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
        draft.mainPosts.find((v) => v.id === action.payload.PostId).content = action.payload.content;
      })
      .addCase(updatePost.rejected, (draft, action) => {
        draft.updatePostLoading = false;
        draft.updatePostError = action.error;
      }) 
      .addCase(retweet.pending, (state, action) => {
        state.retweetLoading = true;
        state.retweetDone = false;
        state.retweetError = null;
      })
      .addCase(retweet.fulfilled, (state, action) => {
        state.retweetLoading = false;
        state.retweetDone = true;
        state.mainPosts.unshift(action.payload);
      })
      .addCase(retweet.rejected, (state, action) => {
        state.retweetLoading = false;
        state.retweetError = action.error;
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
      .addCase(likePost.pending, (draft, action) => {
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
      })
      .addCase(likePost.fulfilled, (draft, action) => {
        const post = draft.mainPosts.find((v) => v.id === action.payload.PostId);
        post.Likers.push({ id: action.payload.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
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
        const post = draft.mainPosts.find((v) => v.id === action.payload.PostId);
        post.Likers = post.Likers.filter((v) => v.id !== action.payload.UserId);
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
      })
      .addCase(unlikePost.rejected, (draft, action) => {
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
      })
  },
});

export const { removeImage, resetAddPostDone } = postSlice.actions;
export default postSlice.reducer;
