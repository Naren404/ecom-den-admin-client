import { toast } from "react-toastify"
import { setIsCreating } from "../../utility/promiseSlice"
import { setCategories } from "./categorySlice"
import { createCategory, getCategories } from "./categoryAxiosHelper"

// GET ALL CATEGORIES
export const getCategoriesAction = () => async(dispatch) => {
  const result = await getCategories()

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  dispatch(setCategories(result.data))
}

// CREATE CATEGORY ACTION
export const createCategoryAction = (categoryObj) => async(dispatch) => {

  //set isCreating true
  dispatch(setIsCreating(true))
  // call create category API
  const result = await createCategory(categoryObj)
  // set isCreating false
  dispatch(setIsCreating(false))

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  dispatch(getCategoriesAction())
}