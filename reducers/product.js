import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  product: {
    category: "outer",
    brand: "",
    productName: "",
    price: 0,
    size: "",
    site: "",
    description: "",
    images: [],
  },
  images: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateProduct: (state, action) => {
      // 기존 product 업데이트 로직
      state.product = {
        ...state.product,
        ...action.payload, // action.payload는 product 필드에 병합
      };
    },
    addImage: (state, action) => {
      // 이미지 추가
      state.images.push(action.payload);
    },
    removeImage: (state, action) => {
      // 이미지 제거
      state.images = state.images.filter((_, index) => index !== action.payload);
    },
  },
});

export const { updateProduct, addImage, removeImage } = productSlice.actions; // 액션 내보내기
export default productSlice.reducer; // 리듀서 내보내기


/*export const initialState = {
    product: {
      category: "outer",
      brand: "",
      productName: "",
      price: 0,
      size: "",
      site: "",
      description: "",
      images: [],
    },
    images: [],
  };
  
  export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
  export const ADD_IMAGE = "ADD_IMAGE";
  export const REMOVE_IMAGE = "REMOVE_IMAGE";
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case "UPDATE_PRODUCT":
        return {
          ...state,
          product: {
            ...state.product,
            ...action.data,
          },
        };
      case "ADD_IMAGE":
        return {
          ...state,
          images: [...state.images, action.image],
        };
      case "REMOVE_IMAGE":
        return {
          ...state,
          images: state.images.filter((_, index) => index !== action.index),
        };
      default:
        return state;
    }
  };
  
  export default productReducer;
*/