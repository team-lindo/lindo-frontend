import { createSlice } from '@reduxjs/toolkit';
const clothes = [
  { id: 1, name: "여름 반팔티", gender: "female", season: "summer" },
  { id: 2, name: "겨울 패딩", gender: "male", season: "winter" },
  { id: 3, name: "봄 재킷", gender: "unisex", season: "spring" },
];
const initialState = {
  gender: '',
  season: '',
  clothes,
  // 필요 시 확장 가능 (color, priceRange, brand 등)
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setGender(state, action) {
      state.gender = action.payload;
    },
    setSeason(state, action) {
      state.season = action.payload;
    },
    resetFilters(state) {
      state.gender = '';
      state.season = '';
    },
  },
});

export const { setGender, setSeason, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
