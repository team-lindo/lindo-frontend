import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BiCloset } from "react-icons/bi";
import { GiLabCoat } from "react-icons/gi";
import {
  PiTShirtLight,
  PiPantsLight,
  PiDressLight,
  PiEyeglassesThin,
} from "react-icons/pi";
import { TbShoe, TbBrandRedhat } from "react-icons/tb";
import { BsHandbag } from "react-icons/bs";
import shortId from 'shortid';
export const categories = [
  { name: "ALL", icon: BiCloset },
  { name: "아우터", icon: GiLabCoat },
  { name: "상의", icon: PiTShirtLight },
  { name: "바지", icon: PiPantsLight },
  { name: "드레스", icon: PiDressLight },
  { name: "신발", icon: TbShoe },
  { name: "가방", icon: BsHandbag },
  { name: "모자", icon: TbBrandRedhat },
  { name: "액세서리", icon: PiEyeglassesThin },
];

export const initialClothes = {
  아우터: [
    { uid: "1", url: "/images/coat1.jpg" },
    { uid: "2", url: "/images/coat2.jpg" },
    { uid: "3", url: "/images/jacket1.jpg" },
    { uid: "4", url: "/images/jacket2.jpg" },
  ],
  상의: [
    { uid: "5", url: "/images/sweater1.jpg" },
    { uid: "6", url: "/images/sweater2.jpg" },
    { uid: "7", url: "/images/knit1.jpg" },
    { uid: "8", url: "/images/knit2.jpg" },
  ],
  바지: [
    { uid: "9", url: "/images/jeans1.jpg" },
    { uid: "10", url: "/images/jeans2.jpg" },
  ],
  드레스: [{ uid: "-7", url: "/images/dress1.jpg" }],
  신발: [{ uid: "-8", url: "/images/shoes1.jpg" }],
  가방: [{ uid: "-9", url: "/images/bag1.jpg" }],
  모자: [{ uid: "-10", url: "/images/hat1.jpg" }],
  액세서리: [],
};
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
  initialClothes ,
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
