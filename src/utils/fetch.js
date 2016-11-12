import fetch from 'isomorphic-fetch'
// import Promise from 'es6-promise'

export const addAuthorizationHeader = (accessToken, headers) => {
  return Object.assign({}, headers, {
    Authorization: `Bearer ${accessToken}`
  })
}

export default (url, method, body) => {
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

  return fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(checkStatus)
  .then(parseJSON)
}
