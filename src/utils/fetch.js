import fetch from 'isomorphic-fetch'
// import Promise from 'es6-promise'

export default (url, options = {}) => {
  const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else if (response.status === 401) {
      // Refresh token flow.
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
