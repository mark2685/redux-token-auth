import Promise from 'es6-promise'
import fetch from 'isomorphic-fetch'

const requestCache = []
let isRefreshingTokens = false

export default (url, options = {}) => {
  const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  const parseJSON = (response) => {
    return response.json()
  }

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
}
