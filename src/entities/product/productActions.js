import { toast } from "react-toastify"
import { setProduct, setProducts } from "./productSlice"
import { createProduct, createProductImages, deleteProductImage, getProduct, getProducts, updateProduct } from "./productAxiosHelper"
import { setIsCreating } from "../../utility/promiseSlice"

// GET A PRODUCT
export const getProductAction = (_id) => async(dispatch) => {
  const result = await getProduct(_id)

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  dispatch(setProduct(result.data))
}

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

// CREATE A PRODUCT IMAGES
export const createProductImagesAction = (productObj) => async(dispatch) => {

  //set isCreating true
  dispatch(setIsCreating(true))
  // call create category API
  const result = await createProductImages(productObj)
  // set isCreating false
  dispatch(setIsCreating(false))

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  toast.success(result.message)
  dispatch(getProductAction(productObj?._id))
  dispatch(getProductsAction())
}

export const deleteProductImageAction = (_id, image) => async(dispatch) => {
  // call create category API
  const result = await deleteProductImage(_id, image)

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  toast.success(result.message)
  dispatch(getProductAction(_id))
  dispatch(getProductsAction())
}