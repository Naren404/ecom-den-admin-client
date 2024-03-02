import { configureStore } from "@reduxjs/toolkit";
import promiseReducer from "./utility/promiseSlice";

const store = configureStore({
  reducer: {
    promise: promiseReducer
  }
})

export default store