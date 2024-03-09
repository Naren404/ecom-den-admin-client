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