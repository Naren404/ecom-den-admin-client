// USER API URL
const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/user`

// PUBLIC ROUTES FOR USER

import { axiosApiCall } from "../../utility/axiosHelper"

// Signup | Create a user
export const createUser = (userObj) => {
  return axiosApiCall({
    method: 'post',
    url: USER_API_URL,
    data: userObj
  })
}

// Verify User Email (From verification Link)
export const verifyUser = (verificationData) => {
  return axiosApiCall({
    method: 'post',
    url: `${USER_API_URL}/verify-email`,
    data: verificationData
  })
}

// Login User
export const loginUser = (loginData) => {
  return axiosApiCall({
    method: 'post',
    url: `${USER_API_URL}/login`,
    data: loginData
  })
}

// PRIVATE ROUTES 

// Get new access token suing refresh token
export const getNewAccessJwt = () => {
  return axiosApiCall({
    method: 'get',
    url: `${USER_API_URL}/accessjwt`,
    isPrivate: true,
    useRefreshToken: true,
  })
}

// GET USER
export const getUser = () => {
  return axiosApiCall({
    method: 'get',
    url: USER_API_URL,
    isPrivate: true,
  })
}

//LOGOUT USER
export const logoutUser = (email, accessJWT) => {
  return axiosApiCall({
    method: 'post',
    url: `${USER_API_URL}/logout`,
    data: { email, accessJWT }
  })
}

// RESET PASSWORD FEATURE

// SEND OTP
export const requestOtp = (email) => {
  return axiosApiCall({
    method: 'post',
    url: `${USER_API_URL}/request-otp`,
    data: { email }
  })
}

// RESET PASSWORD
export const resetPassword = (resetPasswordObj) => {
  return axiosApiCall({
    method: 'patch',
    url: `${USER_API_URL}/reset-password`,
    data: resetPasswordObj
  })
}
