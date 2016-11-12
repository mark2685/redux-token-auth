export const addAuthorizationHeader = (accessToken, headers) => {
  return Object.assign({}, headers, {
    Authorization: `Bearer ${accessToken}`
  })
}

export const getAuthHeaders = (tokens, headers) => {
  if (tokens) {
    return addAuthorizationHeader(tokens.accessToken, headers)
  } else {
    return {}
  }
}
