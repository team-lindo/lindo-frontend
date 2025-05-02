import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import shortId from 'shortid';
import { faker } from '@faker-js/faker';
import _ from 'lodash';
import { fakeApi } from './user';
import axiosInstance from '../api/axiosInstance';

export const generateDummyPost = (number) =>
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
          siteUrl: product.siteUrl,
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
//console.log("Generated Dummy Posts Array:", generateDummyPost(10)); 

export const initialState = {
  //게시글 작성마다 mainPosts 앞에 추가됨
  //댓글은 게시글의 id를 찾고 Comments로 접근함
  mainPosts:  [],
  //mainPosts: generateDummyPost(10),  
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
  bookmarkLoading: false,
  bookmarkDone: false,
  bookmarkError: null,
};

export const loadHashtagPosts = createAsyncThunk(
  'post/loadHashtagPosts',
  async ({ lastId, tag },{rejectWithValue}) => {
    try {
      const response = await axiosInstance.get('/api/posts/hashtag', {
        params: { tag, lastId },
      });

      return {
        posts: response.data.posts,
        hasMorePosts: response.data.posts.length === 10, // 무한스크롤 여부
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loadUserPosts = createAsyncThunk(
  'post/loadUserPosts',
  async ({ lastId, id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/users/${id}/posts`, {
        params: { lastId },
      });

      return {
        posts: response.data.posts,             // Post[] 배열
        hasMorePosts: response.data.hasMorePosts, // boolean
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
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
  
  export const fetchPosts = async (lastId) => {
    try {
      const response = await axiosInstance.get('/api/posts', {
        params: { lastId }
      });
  
      return {
        posts: response.data.posts,             // Post[]
        hasMorePosts: response.data.hasMorePosts, // boolean
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  };
  const throttledFetchPosts = _.throttle(fetchPosts, 5000); 
  
  export const loadPosts = createAsyncThunk("post/loadPosts", async (lastId, thunkAPI) => {
    const result = await throttledFetchPosts(lastId, thunkAPI); 
   // console.log("Thunk Result:", result); 
    return result;
  });

// reducers/post.js 또는 post thunk 내부
export const loadPost = createAsyncThunk(
  'post/loadPost',
  async ({ id }, thunkAPI) => {
    try {
      console.log("🔍 loadPost 요청 ID:", id);
      const response = await axiosInstance.get(`/api/post/${id}`);
      console.log(" loadPost 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("loadPost 실패:", error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

  
  export const addPost = createAsyncThunk(
    'post/addPost',
    async (data, thunkAPI) => {
      try {
        // 기본 검증
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid data: must be an object');
        }
  
        if (!data.user || !data.user.id) {
          throw new Error('User information is required');
        }
  
        const postData = {
          id: data.id, // optional
          user: {
            id: data.user.id,
            nickname: data.user.nickname,
          },
          content:
            typeof data.content === 'string' && data.content.trim() !== ''
              ? data.content.trim()
              : data.description && typeof data.description === 'string'
              ? data.description.trim()
              : '설명이 없습니다.',
          Images: Array.isArray(data.Images)
            ? data.Images.map((img) => ({
                src: img.src,
                productInfo: img.productInfo || '',
                siteUrl: img.siteUrl || '',
              }))
            : [],
          products: Array.isArray(data.products)
            ? data.products.map((product) => ({
                productId: product.productId || '',
                productName: product.productName,
                category: product.category,
                brand: product.brand,
                price: product.price ?? 0,
                size: product.size,
                description: product.description || '설명 없음',
                imageTag: product.imageTag || '',
                siteUrl: product.siteUrl || '',
              }))
            : [],
          comments: Array.isArray(data.comments)
            ? data.comments.map((c) => ({
                nickname: c.nickname || '댓글 작성자',
                text: c.text || '내용 없음',
              }))
            : [],
        };
  
        const response = await axiosInstance.post('/api/post', postData, {
          withCredentials: true,
        });
  
        return response.data;
      } catch (error) {
        console.error(' Error in addPost:', error.message);
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  

  export const addComment = createAsyncThunk(
    'post/addComment',
    async (data, thunkAPI) => {
      try {
        const { postId, content } = data;
  
        if (!postId || typeof content !== 'string') {
          throw new Error('postId와 content는 필수입니다.');
        }
  
        const response = await axiosInstance.post(
          `/api/post/${postId}/comment`,
          { content },
        );
  
        return {
          postId,
          comment: response.data.comment, 
        };
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  export const removePost = createAsyncThunk(
    'post/removePost',
    async (postId, thunkAPI) => {
      try {
        if (!postId) {
          throw new Error('postId는 필수입니다.');
        }
  
        const response = await axiosInstance.delete(`/api/post/${postId}`, {
        });
  
        return {
          postId: response.data.postId,   
          message: response.data.message, // 예: 'Post removed successfully'
        };
      } catch (error) {
        console.error(' Failed to remove post:', error.message);
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
    }
  );

  export const updatePost = createAsyncThunk(
    'post/updatePost',
    async (data, { rejectWithValue }) => {
      try {
        const { PostId, content } = data;
  
        if (!PostId || typeof content !== 'string') {
          throw new Error('PostId와 content는 필수입니다.');
        }
  
        const response = await axiosInstance.patch(
          `/api/post/${PostId}`,
          { content }, // 요청 body
        );
  
        return {
          PostId: response.data.PostId,
          content: response.data.content,
        };
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

  export const likePost = createAsyncThunk(
    'post/likePost',
    async (postId, { getState, rejectWithValue }) => {
      try {
        if (!postId) throw new Error('postId가 필요합니다.');
  
        const state = getState();
        const me = state.user.me;
        if (!me) throw new Error('로그인이 필요합니다.');
  
        const response = await axiosInstance.post(
          `/api/post/${postId}/like`,
          {}, // body는 비워둠
        );
  
        return {
          PostId: response.data.PostId,
          UserId: response.data.UserId,
        };
      } catch (error) {
        console.error('🔥 likePost error:', error.message);
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  export const unlikePost = createAsyncThunk(
    'post/unlikePost',
    async (postId, { getState, rejectWithValue }) => {
      try {
        if (!postId) throw new Error('postId가 필요합니다.');
  
        const state = getState();
        const me = state.user.me;
        if (!me) throw new Error('로그인이 필요합니다.');
  
        const response = await axiosInstance.delete(
          `/api/post/${postId}/like`,
        );
  
        return {
          PostId: response.data.PostId,
          UserId: response.data.UserId,
        };
      } catch (error) {
        console.error('🔥 unlikePost error:', error.message);
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  export const uploadImage = createAsyncThunk(
    'post/uploadImage',
    async (formData, thunkAPI) => {
      try {
        if (!(formData instanceof FormData)) {
          throw new Error('FormData 형식이 필요합니다.');
        }
  
        const response = await axiosInstance.post('/api/post/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        return response.data; // 예: [ { id, src }, ... ]
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
    }
  );
   
  export const bookmark = createAsyncThunk(
    'post/bookmark',
    async (postId, { getState, rejectWithValue }) => {
      try {
        const state = getState();
        const me = state.user.me;
        if (!me) throw new Error('로그인이 필요합니다.');
  
        const response = await axiosInstance.post(
          `/api/post/${postId}/bookmark`,
          {},
        );
  
        // 서버는 북마크된 게시글을 응답한다고 가정
        return response.data; // { id, content, User, Images, Comments 등 }
      } catch (error) {
        console.error(' bookmark API 오류:', error.message);
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  export const unbookmark = createAsyncThunk(
    'post/unbookmark',
    async (postId, { getState, rejectWithValue }) => {
      try {
        const state = getState();
        const me = state.user.me;
        if (!me) throw new Error('로그인이 필요합니다.');
  
        const response = await axiosInstance.delete(
          `/api/post/${postId}/bookmark`,
        );
  
        return {
          postId: response.data.postId,
          message: response.data.message || '북마크가 해제되었습니다.',
        };
      } catch (error) {
        console.error(' unbookmark API 오류:', error.message);
        return rejectWithValue(error.response?.data || error.message);
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
      .addCase(loadPost.fulfilled, (draft, action) => {
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
       // draft.singlePost = action.payload;
       const already = draft.mainPosts.find((p) => String(p.id) === String(action.payload.id));
       if (!already) {
         draft.mainPosts.unshift(action.payload); // 앞에 추가
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
        // draft.mainPosts = draft.mainPosts.concat(action.payload);
        // draft.hasMorePosts = action.payload.length === 10;
        draft.mainPosts = draft.mainPosts.concat(action.payload.posts);
        draft.hasMorePosts = action.payload.hasMorePosts;
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

  },
})

export const { removeImage, resetAddPostDone,addPostToMainPosts } = postSlice.actions;
export default postSlice.reducer;
