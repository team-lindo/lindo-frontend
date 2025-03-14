import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import shortId from 'shortid';

// 기본 더미 제품 데이터
const dummyProduct = {
  id: shortId.generate(),
  category: "outer",
  brand: "Nike",
  productName: "Winter Jacket",
  price: 129000,
  size: "L",
  description: "A warm and stylish winter jacket.",
  images: [
    {
      src: "https://via.placeholder.com/150",
      fetchPriority: "auto",
      productInfo: "Nike - Winter Jacket / 129000원 / L",
      siteUrl: "https://nike.com"
    }
  ]
};

// 제품 정보 가져오기 (비동기 API 요청 시뮬레이션)
export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyProduct);
      }, 500); // 0.5초 후 데이터 반환 (API 호출 느낌)
    });
  }
);

// 초기 상태 정의
const initialState = {
  product: dummyProduct,
  loading: false,
  error: null,
};

// `productSlice` 정의
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // 제품 정보 업데이트 + 이미지 태그 자동 추가
    updateProduct: (state, action) => {
      const { productName, brand, price, size, siteUrl, images } = action.payload;

      // 이미지 태그 추가
      const updatedImages = images?.map((img) => ({
        src: img.src || img, // 이미지 URL
        fetchPriority: "auto",
        productInfo: productName ? `${brand} - ${productName} / ${price}원 / ${size}` : "",
        siteUrl: siteUrl || ""
      })) || [];

      state.product = {
        ...state.product,
        ...action.payload,
        images: updatedImages.length > 0 ? updatedImages : state.product.images
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch product';
      });
  },
});

// 액션 및 리듀서 내보내기
export const { updateProduct } = productSlice.actions;
export default productSlice.reducer;
