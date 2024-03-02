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