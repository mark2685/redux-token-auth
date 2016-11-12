import fetch from '../utils/fetch'

export const CALL_API = Symbol('Authenticated API Request')

export default store => next => action => {
  const callAPI = action[CALL_API]

  console.log('action ', action)

  console.log('callAPI ', callAPI)

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const httpMethods = [ 'POST', 'GET', 'PUT', 'DELETE' ]

  const { types, url, method, data } = callAPI

  console.log('boom! types (', types, '), url (', url, ')')

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

  console.log(`requestType ${requestType}, successType ${successType}, failureType ${failureType}`)

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  next(actionWith({ type: requestType }))

  console.log(successType, failureType)

  return fetch(url, method, data) // TODO: Setup then's...
}
