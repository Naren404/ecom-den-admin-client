import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  products: [],
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
})

const { reducer: productReducer, actions } = productSlice;

export const { setProducts, setProduct } = actions;
export default productReducer;
