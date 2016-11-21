import fetch from '../utils/fetch'
import AuthUtility from '../utils/AuthUtility'
import {
  getAuthHeaders,
  cacheAuthRequest,
  retryCachedRequests,
  failCachedRequests,
  isRefreshingTokens
} from '../utils/auth'
import {
  refreshToken,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_ERROR
} from '../actions/authActions'

export const CALL_API = Symbol('Authenticated API Request')

const authConfig = {
  headers: { 'Content-Type': 'application/json' }
}

const auth = new AuthUtility(authConfig)

const middleware = store => next => action => {
  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { types, url, method, data } = callAPI

  if (!types || !Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types (ex. `types: [STATE, SUCCESS, ERROR]`).')
  }

  const httpMethods = [ 'POST', 'GET', 'PUT', 'DELETE' ]

  if (!url || typeof url !== 'string') {
    throw new Error('Specify a URL (ex. `url:\'http://google.com/\'`).')
  }

  if (!method || typeof method !== 'string' || httpMethods.indexOf(method) === -1) {
    throw new Error('Specify an HTTP method (ex. `method: \'POST\'`).')
  }

  const [ requestType, successType, failureType ] = types

  const actionWith = (action, data) => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  next(actionWith(action, { type: requestType }))

  const { accessToken, refreshToken, isRefreshing } = store.getState().tokens

  if (accessToken !== null && auth.accessToken !== accessToken) {
    auth.tokens = { accessToken, refreshToken }
  }

  const options = {
    method,
    body: JSON.stringify(data)
  }

  let successAction = { type: successType, payload: response.data }
  const failureAction = { type: failureType, error: reason }

  if (requestType === REFRESH_TOKEN) {
    auth.isRefreshingTokens = true
  } else if (types.indexOf(REFRESH_TOKEN) === -1 && auth.isRefreshingTokens) {
    auth.cacheAuthRequest(url, options)
    cacheAuthRequest(callAPI)
  }

  return auth.fetch(url, options)
    .then(response => {
      if (successType === REFRESH_TOKEN_SUCCESS) {
        // Refresh Token Succeeded, clear out the old requests with successType
        auth.isRefreshingTokens = false
        successAction.payload = Object.assign({}, successAction.payload, {
          requests: auth.cache
        })

      } else {
        next(actionWith(successAction))
      }
    }, reason => {
      if (failureType === REFRESH_TOKEN_ERROR) {
        auth.failCachedRequests(next)
        // REFRESH TOKEN FAILED, clear out the old requests with failuretype
        next(actionWith(action, failureAction))
      } else if (reason.response.status === 401) {
        store.dispatch(refreshToken(refreshToken))
      } else {
        next(actionWith(action, failureAction))
      }
    })
}

export default middleware
