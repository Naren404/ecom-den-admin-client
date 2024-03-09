import { toast } from "react-toastify"
import { setProducts } from "./productSlice"
import { createProduct, getProducts, updateProduct } from "./productAxiosHelper"
import { setIsCreating } from "../../utility/promiseSlice"

// GET ALL PRODUCTS
export const getProductsAction = () => async(dispatch) => {
  const result = await getProducts()

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  dispatch(setProducts(result.data))
}

// CREATE A PRODUCT
export const createProductAction = (productObj) => async(dispatch) => {

  //set isCreating true
  dispatch(setIsCreating(true))
  // call create category API
  const result = await createProduct(productObj)
  // set isCreating false
  dispatch(setIsCreating(false))

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  toast.success(result.message)
  dispatch(getProductsAction())
}

// UPDATE A CATEGORY
export const updateProductAction = (productObj) => async(dispatch) => {

  //set isCreating true
  dispatch(setIsCreating(true))
  // call create category API
  const result = await updateProduct(productObj)
  // set isCreating false
  dispatch(setIsCreating(false))

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  toast.success(result.message)
  dispatch(getProductsAction())
}
