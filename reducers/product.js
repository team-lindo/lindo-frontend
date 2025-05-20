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
import axiosInstance from '../api/axiosInstance'; 

export const categories = [
  { name: "ALL", label: "전체", icon: BiCloset },
  { name: "outer", label: "아우터", icon: GiLabCoat },
  { name: "top", label: "상의", icon: PiTShirtLight },
  { name: "bottom", label: "바지", icon: PiPantsLight },
  { name: "dress", label: "드레스", icon: PiDressLight },
  { name: "shoes", label: "신발", icon: TbShoe },
  { name: "bag", label: "가방", icon: BsHandbag },
  { name: "hat", label: "모자", icon: TbBrandRedhat },
  { name: "accessory", label: "액세서리", icon: PiEyeglassesThin },
];

export const initialClothes = {
  outer: [
    { uid:"a1", url: "/images/coat1.jpg", name: "봄 코트",
      price: 89000,
   },
    { uid: "a2", url: "/images/coat2.jpg", name: " 코트",
      price: 97000,
     },
    { uid: "a3", url: "/images/jacket1.jpg",
      name: "자켓",
      price: 189000,
     },
    { uid:"a4", url: "/images/jacket2.jpg",  name: "여름 자켓",
      price: 289000,
   },
  ],
  top: [
    { uid: shortId.generate(), url: "/images/sweater1.jpg" },
    { uid: shortId.generate(), url: "/images/sweater2.jpg" },
    { uid: shortId.generate(), url: "/images/knit1.jpg" },
    { uid: shortId.generate(), url: "/images/knit2.jpg" },
  ],
  bottom: [
    { uid: shortId.generate(), url: "/images/jeans1.jpg" },
    { uid: shortId.generate(), url: "/images/jeans2.jpg" },
  ],
  dress: [{ uid: shortId.generate(), url: "/images/dress1.jpg" }],
  shoes: [{ uid: shortId.generate(), url: "/images/shoes1.jpg" }],
  bag: [{ uid: shortId.generate(), url: "/images/bag1.jpg" }],
  hat: [{ uid: shortId.generate(), url: "/images/hat1.jpg" }],
  accessory: [],
};
const uid = shortId.generate(); // 상품 uid

// 기본 더미 제품 데이터
const dummyProduct = {
  uid,
  id: shortId.generate(),
  category: "outer",
  brand: "Nike",
  productName: "Winter Jacket",
  price: 129000,
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


// 초기 상태 정의
const initialState = {
  product: dummyProduct,         // 현재 단일 제품
  // product: null,
  products: [],                  // 복수 제품 저장용
  closetItems: [],            // ✅ 내 옷장 아이템
  tagsByImage: {},               // 이미지별 태그 정보 전역화
  loading: false,
  error: null,
  //initialClothes,
 initialClothes: {
    outer: [],
    top: [],
    bottom: [],
    dress: [],
    shoes: [],
    bag: [],
    hat: [],
    accessory: [],
  },
  closetItemsByCategory: {}, // category별 분류
  allClosetItems: [],        // 전체 배열
  fetchClosetLoading: false,
  fetchClosetError: null,
  
};


// // 제품 정보 가져오기 (비동기 API 요청 시뮬레이션)
// export const fetchProduct = createAsyncThunk(
//   'product/fetchProduct',
//   async () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(dummyProduct);
//       }, 500); // 0.5초 후 데이터 반환 (API 호출 느낌)
//     });
//   }
// );

//특정 유저의 옷장 보기 

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/closet/me'); // ✅ 내 옷장 API
      return response.data; // [{ uid, name, price, url, ... }]
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


/* addProduct 연동동
export const addProduct = createAsyncThunk('product/addProduct', async (product, thunkAPI) => {
  try {
    const response = await axiosInstance.post('/product', product); // 서버 연동 시
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});*/

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (product, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/api/product', product);
      return response.data;  // 응답: newProduct
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (productId, thunkAPI) => {
    try {
      await axiosInstance.delete(`/api/product/${productId}`);
      return productId; // 삭제된 ID 반환
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// export const updateProduct = createAsyncThunk(
//   'product/updateProduct',
//   async ({ productId, updatedData }, thunkAPI) => {
//     try {
//       const response = await axiosInstance.patch(`/api/product/${productId}`, updatedData);
//       return response.data; // 수정된 상품 반환
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// 특정 상품(uid)의 정보를 서버에서 불러오기
//상품 상세 페이지 (/product/[uid])	해당 상품 하나만 상세히 보여줘야 할 때
//프리뷰 모달 또는 태깅 클릭	이미지에서 상품 태그 클릭 시, uid만 있고 다른 정보가 없을 때 서버에서 상세 조회
export const getProductById = createAsyncThunk(
  'product/getProductById',
  async (uid, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/api/product/${uid}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

//로그인한 유저의 옷장 아이템 리스트
export const fetchMyCloset = createAsyncThunk(
  'product/fetchMyCloset',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/closet/me'); // ✅ 내 옷장 API
      return response.data.closetItems; // ✅ [{ uid, name, price, ... }]
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


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
      })
      .addCase(addProduct.fulfilled, (draft, action) => {
        const product = action.payload;
        const category = product.category;
      
        if (!draft.closetItemsByCategory[category]) {
          draft.closetItemsByCategory[category] = [];
        }
        draft.closetItemsByCategory[category].push(product);
      
        draft.allClosetItems.push(product); // 전체 보기용
      })
      
      .addCase(addProduct.rejected, (draft,action) => {
        draft.error = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (draft, action) => {
        const id = action.payload;
        for (const category in draft.initialClothes) {
          draft.initialClothes[category] = draft.initialClothes[category].filter(p => p.id !== id);
        }
      })
      // .addCase(updateProduct.fulfilled, (draft, action) => {
      //   const updated = action.payload;
      //   const category = updated.category;
      //   draft.initialClothes[category] = draft.initialClothes[category].map((p) =>
      //     p.id === updated.id ? updated : p
      //   )
        .addCase(getProductById.fulfilled, (draft, action) => {
          draft.product = action.payload;
        })
        .addCase(fetchMyCloset.pending, (state) => {
          state.fetchClosetLoading = true;
          state.fetchClosetError = null;
        })
        .addCase(fetchMyCloset.fulfilled, (state, action) => {
          state.fetchClosetLoading = false;
          state.closetItems = action.payload; // ✅ closetItems 저장
        })
        .addCase(fetchMyCloset.rejected, (state, action) => {
          state.fetchClosetLoading = false;
          state.fetchClosetError = action.payload;
        })

  },
  })

// 액션 및 리듀서 export
export const {
  setTagsByImage,
  resetProductState,
} = productSlice.actions;

export default productSlice.reducer;

