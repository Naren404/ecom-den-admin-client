import { toast } from "react-toastify"
import { setIsCreating } from "../../utility/promiseSlice"
import { setCategories } from "./categorySlice"
import { createCategory, deleteCategory, getCategories, updateCategory } from "./categoryAxiosHelper"

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
  toast.success(result.message)
  dispatch(getCategoriesAction())
}

// UPDATE A CATEGORY
export const updateCategoryAction = (categoryObj) => async(dispatch) => {

  //set isCreating true
  dispatch(setIsCreating(true))
  // call create category API
  const result = await updateCategory(categoryObj)
  // set isCreating false
  dispatch(setIsCreating(false))

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  toast.success(result.message)
  dispatch(getCategoriesAction())
}

// DELETE A CATEGORY
export const deleteCategoryAction = (_id) => async(dispatch) => {
  // call create category API
  const result = await deleteCategory(_id)

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  toast.success(result.message)
  dispatch(getCategoriesAction())
}