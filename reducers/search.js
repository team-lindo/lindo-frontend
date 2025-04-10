import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fakeApi } from '../reducers/user';


// 🔍 비동기 검색 thunk
export const searchItems = createAsyncThunk(
  'search/searchItems',
  async (params, thunkAPI) => {
    try {
      const response = await fakeApi.search(params);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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
    clearSearch(state) {
      state.results = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;

