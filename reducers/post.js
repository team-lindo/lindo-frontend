import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import shortId from 'shortid';

export const initialState = {
  //게시글 작성마다 mainPosts 앞에 추가됨
  //댓글은 게시글의 id를 찾고 Comments로 접근함함
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'test',
      },
      description: null,
      content: {
        description: '첫 번째 게시물 #츄르 #닭가슴살',
      },
      Images: [
        { id: shortId.generate(),
          src: '/images/a.png' },
        {
          id: shortId.generate(),
           src: '/images/b.png' },
        { 
          id: shortId.generate(),
          src: '/images/c.png' },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: '까미',
          },
          content: '우와 신상 츄르야~!?',
        },
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: '노랭이',
          },
          content: '나는 참치캔이 좋더라!^^',
        },
      ],
    },
  ],
  posts: [],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
};

export const addPost = createAsyncThunk('post/addPost', async (data, thunkAPI) => {
  try {
    const dummyPost = {
      id:data.id,
      User: {
        id: 1,
        nickname: 'test',
      },
      content: data,
      Images: [],
      Comments: [],
    };
    return dummyPost;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

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
    // API 호출로 특정 게시물 삭제
    const response = await axios.delete(`/post/${postId}`);
    
    // 삭제된 게시물 ID 반환
    return {
      postId, // 삭제된 게시물의 ID
      ...response.data, // 서버에서 반환된 추가 데이터 (예: 메시지)
    };
  } catch (error) {
    console.error('Failed to remove post:', error.response?.data || error.message);

    return thunkAPI.rejectWithValue(error.response?.data || error.message);
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
      .addCase(HYDRATE, (draft, action) => {
        draft.mainPosts = [...draft.mainPosts, ...action.payload.post.mainPosts];
      })
      .addCase(addPost.pending, (draft) => {
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
      })
      .addCase(addPost.fulfilled, (draft, action) => {
        console.log('Payload:', action.payload); // Redux 액션 페이로드 확인

        draft.addPostLoading = false;
        draft.addPostDone = true;
  // description 처리
  const description = action.payload.description || 
    action.payload.content?.text?.description || 
    '내용 없음';

  // content.description 처리
  const contentDescription = action.payload.content?.text?.description || description;

  // 게시물 추가
  draft.mainPosts.unshift({
    ...action.payload,
    description: description, // description 설정
    content: {
      ...action.payload.content,
      description: contentDescription, // content.description 설정
    },
  });

  console.log('Updated mainPosts:', draft.mainPosts); // 상태 확인
  console.log('addPost.fulfilled action.payload:', action.payload);

       /* draft.mainPosts.unshift({
          ...action.payload,
          description:
            action.payload.description ||
            (typeof action.payload.content === 'object' && action.payload.content.description) ||
            '내용 없음', // description 필드 설정
          content: {
            description:
              action.payload.description ||
              (typeof action.payload.content === 'object' && action.payload.content.description) ||
              '내용 없음', // content.description 설정
          },
        });*/

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
      
        if (!post.Comments) {
          post.Comments = [];
        }
      
        post.Comments.unshift(action.payload.comment);
      
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
     
        console.log('Action Payload:', action.payload);
        console.log('Main Posts:', draft.mainPosts);
        if (!post) {
          console.error('Post not found:', action.payload.PostId);
        } else {
          console.log('Found Post:', post);
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

export const { removeImage, resetAddPostDone } = postSlice.actions;
export default postSlice.reducer;
