import { CALL_API } from '../middleware/api'

export const AUTHENTICATE = 'AUTHENTICATE'
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
export const AUTHENTICATE_ERROR = 'AUTHENTICATE_ERROR'


export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS'
export const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR'

const fetchTestAuthRequest = user => {
  return {
    [CALL_API]: {
      types: [AUTH_REQUEST, AUTH_REQUEST_SUCCESS, AUTH_REQUEST_ERROR],
      url: 'http://dentalconnect.mouthful.la/api/admin/users',
      method: 'GET'
    }
  }
}

export const testAuthRequest = user => {
  return (dispatch, getState) => {
    return dispatch(fetchTestAuthRequest(user))
  }
}


// = Sign In
const fetchSignIn = user => {
  return {
    [CALL_API]: {
      types: [AUTHENTICATE, AUTHENTICATE_SUCCESS, AUTHENTICATE_ERROR],
      url: 'http://dentalconnect.mouthful.la/api/account/login',
      method: 'POST',
      data: user
    }
  }
}

export const signIn = user => {
  return (dispatch, getState) => {
    return dispatch(fetchSignIn(user))
  }
}

// = Refresh Authentication Tokens
export const REFRESH_TOKEN = 'REFRESH_TOKEN'
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS'
export const REFRESH_TOKEN_ERROR = 'REFRESH_TOKEN_ERROR'

const fetchRefreshAuthToken = token => {
  return {
    [CALL_API]: {
      types: [REFRESH_TOKEN, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_ERROR],
      url: 'http://dentalconnect.mouthful.la/api/account/refresh',
      method: 'POST',
      data: {
        'refreshToken': token
      }
    }
  }
}

export const refreshAuthToken = (token) => {
  return (dispatch, getState) => {
    return dispatch(fetchRefreshAuthToken(token))
  }
}

// = Sign Out
export const SIGNOUT = 'SIGNOUT'
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS'
export const SIGNOUT_ERROR = 'SIGNOUT_ERROR'

const fetchSignOut = user => {
  return {
    [CALL_API]: {
      types: [SIGNOUT, SIGNOUT_SUCCESS, SIGNOUT_ERROR],
      url: 'http://dentalconnect.mouthful.la/api/account/logout',
      method: 'POST'
    }
  }
}

export const signOut = () => {
  return (dispatch, getState) => {
    return dispatch(fetchSignOut())
  }
}
