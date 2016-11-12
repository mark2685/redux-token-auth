import fetch from '../utils/fetch'
import { getAuthHeaders } from '../utils/auth'

export const CALL_API = Symbol('Authenticated API Request')

export default store => next => action => {
  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const httpMethods = [ 'POST', 'GET', 'PUT', 'DELETE' ]

  const { types, url, method, data } = callAPI

  if (!types || !Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types (ex. `types: [STATE, SUCCESS, ERROR]`).')
  }

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

  // Should auth headers be set here?

  const options = {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (store.getState().tokens) {
    if (!options.headers) {
      options.headers = {}
    }

    options.headers = Object.assign({}, getAuthHeaders(store.getState().tokens, options.headers))
  }

  console.log('state ', store.getState())

  console.log(options.headers)


  return fetch(url, options)
    .then((response) => {
      next(actionWith({ type: successType, payload: response.data }))
    }, (reason) => {
      next(actionWith({ type: failureType, error: reason }))
    })
}
