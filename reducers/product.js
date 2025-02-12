import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const dummyProduct = {
  category: "outer",
  brand: "Nike",
  productName: "Winter Jacket",
  price: 129000,
  size: "L",
  site: "https://www.nike.com",
  description: "A warm and stylish winter jacket.",
  images: ["https://via.placeholder.com/150"],
};

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyProduct);
      }, 500); // 0.5초 후 데이터 반환 (API 호출 느낌)
    });
  }
);

const initialState = {
  product: dummyProduct,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateProduct: (state, action) => {
      state.product = { ...state.product, ...action.payload };
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

export const { updateProduct } = productSlice.actions;
export default productSlice.reducer;


/*import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (userId) => {
    const response = await fetch(`/api/user/${userId}/product`);
    return response.json(); 
  }
);

const initialState = {
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
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateProduct: (state, action) => {
      state.product = { ...state.product, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload; // 서버에서 가져온 데이터 저장
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch product';
      });
  },
});

export const { updateProduct } = productSlice.actions;
export default productSlice.reducer;
*/