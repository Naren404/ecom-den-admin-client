import { configureStore } from "@reduxjs/toolkit";
import promiseReducer from "./utility/promiseSlice";
import userReducer from "./entities/user/userSlice";

const store = configureStore({
  reducer: {
    promise: promiseReducer,
    user: userReducer,
  }
})

export default store