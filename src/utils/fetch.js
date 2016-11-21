require('es6-promise')

import fetch from 'isomorphic-fetch'

export default (url, options = {}) => {
  const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      const error = new Error(response.statusText)
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
