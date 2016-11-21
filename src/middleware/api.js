import AuthUtility from '../utils/AuthUtility'
import {
  refreshAuthTokens,
  cachedRequestsProceed,
  cachedRequestsFail,
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

  if (auth.isRefreshingTokens !== isRefreshing) {
    auth.isRefreshingTokens = isRefreshing
  }

  const options = {
    method,
    body: JSON.stringify(data)
  }


  if (types.indexOf(REFRESH_TOKEN) === -1 && auth.isRefreshingTokens) {
    auth.cacheAuthAction(callAPI)

    return
  }

  return auth.fetch(url, options)
    .then(response => {

      next(actionWith({ type: successType, payload: response.data }))

      if (successType === REFRESH_TOKEN_SUCCESS) {
        store.dispatch(cachedRequestsProceed(auth.cache))
      }
    }, reason => {
      const failureAction = { type: failureType, error: reason }

      if (failureType === REFRESH_TOKEN_ERROR) {
        next(actionWith(action, failureAction))

        auth.clearCache()

        store.dispatch(cachedRequestsFail(Object.assign({}, auth.cache)))

        auth.clearCache()
      } else if (reason.response.status === 401) {
        auth.cacheAuthAction(callAPI)

        store.dispatch(refreshAuthTokens(refreshToken))
      } else {
        next(actionWith(action, failureAction))
      }
    })
}

export default middleware
