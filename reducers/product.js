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
    { uid: shortId.generate(), url: "/images/coat1.jpg" },
    { uid: shortId.generate(), url: "/images/coat2.jpg" },
    { uid: shortId.generate(), url: "/images/jacket1.jpg" },
    { uid: shortId.generate(), url: "/images/jacket2.jpg" },
  ],
  상의: [
    { uid: shortId.generate(), url: "/images/sweater1.jpg" },
    { uid: shortId.generate(), url: "/images/sweater2.jpg" },
    { uid: shortId.generate(), url: "/images/knit1.jpg" },
    { uid: shortId.generate(), url: "/images/knit2.jpg" },
  ],
  바지: [
    { uid: shortId.generate(), url: "/images/jeans1.jpg" },
    { uid: shortId.generate(), url: "/images/jeans2.jpg" },
  ],
  드레스: [{ uid: shortId.generate(), url: "/images/dress1.jpg" }],
  신발: [{ uid: shortId.generate(), url: "/images/shoes1.jpg" }],
  가방: [{ uid: shortId.generate(), url: "/images/bag1.jpg" }],
  모자: [{ uid: shortId.generate(), url: "/images/hat1.jpg" }],
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
  product: dummyProduct,         // 현재 단일 제품
  products: [],                  // 복수 제품 저장용
  tagsByImage: {},               // 이미지별 태그 정보 전역화
  loading: false,
  error: null,
  initialClothes,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateProduct: (draft, action) => {
      const { productName, brand, price, size, siteUrl, images } = action.payload;
      const updatedImages = images?.map((img) => ({
        src: img.src || img,
        fetchPriority: "auto",
        productInfo: productName ? `${brand} - ${productName} / ${price}원 / ${size}` : "",
        siteUrl: siteUrl || ""
      })) || [];

      draft.product = {
        ...draft.product,
        ...action.payload,
        images: updatedImages.length > 0 ? updatedImages : draft.product.images
      };
    },

    addProduct: (draft, action) => {
      draft.products.push(action.payload);
    },

    removeProduct: (draft, action) => {
      draft.products = draft.products.filter(p => p.id !== action.payload);
    },

    setTagsByImage: (draft, action) => {
      draft.tagsByImage = action.payload;
    },

    resetProductState: (draft) => {
      draft.product = dummyProduct;
      draft.products = [];
      draft.tagsByImage = {};
      draft.loading = false;
      draft.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (draft) => {
        draft.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (draft, action) => {
        draft.loading = false;
        draft.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (draft) => {
        draft.loading = false;
        draft.error = 'Failed to fetch product';
      });
  },
});

// 액션 및 리듀서 export
export const {
  updateProduct,
  addProduct,
  removeProduct,
  setTagsByImage,
  resetProductState,
} = productSlice.actions;

export default productSlice.reducer;

