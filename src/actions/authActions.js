import { CALL_API } from '../middleware/api'

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS'
export const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR'

const fetchTestAuthRequest = user => {
  return {
    [CALL_API]: {
      types: [AUTH_REQUEST, AUTH_REQUEST_SUCCESS, AUTH_REQUEST_ERROR],
      url: 'http://dentalconnect.mouthful.la/api/admin/practices',
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
export const AUTHENTICATE = 'AUTHENTICATE'
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
export const AUTHENTICATE_ERROR = 'AUTHENTICATE_ERROR'

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

const fetchRefreshAuthTokens = token => {
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

export const refreshAuthTokens = (token) => {
  return (dispatch, getState) => {
    return dispatch(fetchRefreshAuthTokens(token))
  }
}

// = Refetch Requests (either by proceeding, or failing the requests)
export const REFETCH_REQUESTS = 'REFETCH_REQUESTS'
export const REFETCH_REQUESTS_SUCCESS = 'REFETCH_REQUESTS_SUCCESS'
export const REFETCH_REQUESTS_ERROR = 'REFETCH_REQUESTS_ERROR'
// export const SIGNOUT_FORCE = 'SIGNOUT_FORCE'

const fetchCachedActions = request => {
  return {
    [CALL_API]: {
      ...request
    }
  }
}

export const cachedRequestsProceed = requests => {
  return (dispatch, getState) => {
    requests.forEach(action => {
      return dispatch(fetchCachedActions(action))
    })
  }
}

const failRequest = request => {
  const [ failureType ] = request.types
  return {
    type: failureType
  }
}

export const cachedRequestsFail = requests => {
  return (dispatch, getState) => {
    requests.forEach(action => {
      return dispatch(failRequest(action))
    })
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
