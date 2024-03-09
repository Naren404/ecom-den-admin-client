import { toast } from "react-toastify"
import { setProducts } from "./productSlice"
import { getProducts } from "./productAxiosHelper"

// GET ALL PRODUCTS
export const getProductsAction = () => async(dispatch) => {
  const result = await getProducts()

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  dispatch(setProducts(result.data))
}