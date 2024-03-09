import { configureStore } from "@reduxjs/toolkit";
import promiseReducer from "./utility/promiseSlice";
import userReducer from "./entities/user/userSlice";
import categoryReducer from "./entities/category/categorySlice";
import productReducer from "./entities/product/productSlice";

const store = configureStore({
  reducer: {
    promise: promiseReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
  }
})

export default store