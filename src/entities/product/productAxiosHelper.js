import { axiosApiCall } from "../../utility/axiosHelper"

// PRODUCT API URL
const PRODUCT_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/product`

// GET ALL PRODUCTS
export const getProducts = () => {
  return axiosApiCall({
    method: 'get',
    url: PRODUCT_API_URL,
  })
}

// CREATE A PRODUCT
export const createProduct = (productObj) => {
  return axiosApiCall({
    method: 'post',
    url: PRODUCT_API_URL,
    data: productObj,
    isPrivate: true,
  })
}

// UPDATE A PRODUCT
export const updateProduct = (productObj) => {
  return axiosApiCall({
    method: 'patch',
    url: PRODUCT_API_URL,
    data: productObj,
    isPrivate: true,
  })
}