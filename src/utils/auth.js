export const addAuthorizationHeader = (token, headers) => {
  return Object.assign({}, headers, {
    Authorization: `Bearer ${token}`
  })
}

export const getAuthHeaders = (token, headers) => {
  if (token) {
    return addAuthorizationHeader(token, headers)
  } else {
    return {}
  }
}

let requestCache = []

export const cacheAuthRequest = (action) => {
  if (!requestCache[action.url]) {
    requestCache[action.url] = []
  }
  requestCache[action.url].push(action)
}

export const clearAuthRequest = () => {
  const _copy = requestCache

  requestCache = []

  return Object.create(_copy)
}

export const retryCachedRequests = () => {
  console.log('retryCachedRequests')
}

export const failCachedRequests = () => {
  console.log('failCachedRequests')
}

export default class AuthUtility {
  constructor() {}
}
