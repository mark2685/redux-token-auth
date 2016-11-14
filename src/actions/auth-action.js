import { CALL_API } from '../middleware/api'
import { AUTHENTICATE, AUTHENTICATE_SUCCESS } from './authenticate'
import { SIGNOUT_SUCCESS } from './sign-out'

export const AUTH = 'AUTH'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'

const fetchAuthRequest = user => {
  return {
    [CALL_API]: {
      types: [AUTH, AUTH_SUCCESS, AUTH_ERROR],
      url: 'http://dentalconnect.mouthful.la/api/admin/users',
      method: 'GET'
    }
  }
}

export const authRequest = user => {
  return (dispatch, getState) => {
    return dispatch(fetchAuthRequest(user))
  }
}

const fetchRefreshToken = token => {
  return {
    [CALL_API]: {
      types: [AUTHENTICATE, AUTHENTICATE_SUCCESS, SIGNOUT_SUCCESS],
      url: 'http://dentalconnect.mouthful.la/api/account/refresh',
      method: 'POST',
      data: {
        'refreshToken': token
      }
    }
  }
}

export const refreshToken = (token) => {
  return (dispatch, getState) => {
    console.log('refresh ', getState)
    return dispatch(fetchRefreshToken(token))
  }
}
