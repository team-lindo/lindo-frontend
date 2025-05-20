import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fakeApi } from '../reducers/user';
import axiosInstance from '../api/axiosInstance'; 


export const searchItems = createAsyncThunk(
  'search/searchItems',
  async (keyword, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/api/search?keyword=${encodeURIComponent(keyword)}`);
      return response.data; // { hashtags, products, brands }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔧 슬라이스 정의
const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSearch(draft) {
      draft.results = [];
      draft.loading = false;
      draft.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchItems.pending, (draft) => {
        draft.loading = true;
        draft.error = null;
      })
      .addCase(searchItems.fulfilled, (draft, action) => {
        draft.loading = false;
        draft.results = action.payload;
      })
      .addCase(searchItems.rejected, (draft, action) => {
        draft.loading = false;
        draft.error = action.payload;
      });
  },
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;

