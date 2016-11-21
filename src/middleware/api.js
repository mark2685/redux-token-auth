import fetch from '../utils/fetch'
import AuthUtility from '../utils/AuthUtility'
import {
  getAuthHeaders,
  cacheAuthRequest,
  retryCachedRequests,
  failCachedRequests,
  isRefreshingTokens
} from '../utils/auth'
import { refreshToken, REFRESH_TOKEN } from '../actions/authActions'
export const CALL_API = Symbol('Authenticated API Request')

const auth = new AuthUtility()

export default store => next => action => {
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

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  next(actionWith({ type: requestType }))

  const { accessToken, refreshToken, isRefreshing } = store.getState().tokens

  if (types.indexOf(REFRESH_TOKEN) === -1 && isRefreshing) {
    // Create
    cacheAuthRequest(callAPI)
  }

  const options = {
    method,
    body: JSON.stringify(data)
  }

  options.headers = auth.headers

  // if (accessToken) {
  //   if (!options.headers) {
  //     options.headers = {}
  //   }
  //   options.headers = Object.assign({}, getAuthHeaders(accessToken, options.headers))
  // }

  return fetch(url, options)
    .then((response) => {
      if (isRefreshing && types.indexOf(REFRESH_TOKEN) !== -1) {
        retryCachedRequests()
      }
      next(actionWith({ type: successType, payload: response.data }))
    }, (reason) => {
      if (reason.response.status === 401 && refreshToken) {
        cacheAuthRequest(url, options)
        store.dispatch(refreshToken(refreshToken))
      } else if (isRefreshing && types.indexOf(REFRESH_TOKEN) !== -1) {
        failCachedRequests()
        next(actionWith({ type: failureType, error: reason }))
      } else {
        next(actionWith({ type: failureType, error: reason }))
      }
    })
}
