import { toast } from "react-toastify"
import { getNewAccessJwt, getUser, logoutUser } from "./userAxiosHelper"
import { setUser } from "./userSlice"

// GET USER ACTION
export const getUserAction = () => async(dispatch) => {
  const result = await getUser()

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  dispatch(setUser(result.data))
}

// AUTOLOGIN
export const autoLoginAction = () => async(dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");

  // check if we have access token and if yes, dispatch get user action
  if(accessJWT){
    return dispatch(getUserAction())
  }

  if(!accessJWT && refreshJWT) {
    const result = await getNewAccessJwt()

    if(result?.status === "success"){
      sessionStorage.setItem("accessJWT", result.data)
      dispatch(getUserAction())
    }
  }

  // we don't have both
}

// Logout User
export const logoutUserAction = (email) => async(dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT")

  // remove tokens from storage
  sessionStorage.removeItem("accessJWT")
  localStorage.removeItem("refreshJWT")

  // clear state
  dispatch(setUser({}))

  // call api to delete session and update user's refesh token
  const result = await logoutUser(email, accessJWT)

  if(result?.status === "success"){
    return toast.success(result.message)
  }
}