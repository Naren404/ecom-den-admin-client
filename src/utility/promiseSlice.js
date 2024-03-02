import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isCreating: false,
}

const promiseSlice = createSlice({
  name: "promise",
  initialState,
  reducers: {
    setIsCreating: (state, action) => {
      state.isCreating = action.payload
    }
  }
})

const { reducer: promiseReducer , actions } = promiseSlice
export const { setIsCreating } = actions
export default promiseReducer