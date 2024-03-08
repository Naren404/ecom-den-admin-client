import { configureStore } from "@reduxjs/toolkit";
import promiseReducer from "./utility/promiseSlice";
import userReducer from "./entities/user/userSlice";
import categoryReducer from "./entities/category/categorySlice";

const store = configureStore({
  reducer: {
    promise: promiseReducer,
    user: userReducer,
    category: categoryReducer,
  }
})

export default store